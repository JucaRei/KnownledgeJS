module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const save = (req, res) => {
    const category = { ...req.body };
    if (req.params.id) category.id = req.params.id;

    try {
      existsOrError(category.name, "Nome não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (category.id) {
      app
        .db("categories")
        .update(category)
        .where({ id: category.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("categories")
        .insert(category)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Código da Categoria não informado.");

      // verifica se a categoria tem uma subcategoria
      const subcategory = await app
        .db("categories")
        .where({ parentId: req.params.id });
      notExistsOrError(subcategory, "Categoria possui subcategorias.");
      //se tiver subcategoria não vai conseguir apagar, se existir vai dar 1 erro

      //verificar também se ela tem artigos
      const articles = await app
        .db("articles")
        .where({ categoryId: req.params.id });
      notExistsOrError(articles, "Categoria possui artigos.");

      const rowsDeleted = await app
        .db("categories")
        .where({ id: req.params.id })
        .del();
      existsOrError(rowsDeleted, "Categoria não foi encontrada.");

      res.status(204).send();
    } catch (msg) {
      res.send(400).send(msg);
    }
  };
  // NOTE - função que recebe uma lista de categorias e retorna a categoria com o atributo Path ()
  // Mostrando nos artigos, subcategorias , etc a categoria Pai ... filhos ( mostra o caminho dos artigos com seus filhos,)
  // parecido como uma arvore de uma pasta, com subpastas , etc
  // SECTION  Não esta no banco , o atributo vai ser montado na API

  const withPath = categories => {
    const getParent = (categories, parentId) => {
      // categoria pai
      const parent = categories.filter(parent => parent.id === parentId);
      return parent.length ? parent[0] : null; // (faz o filtro do parent que esta procurando)
    };

    //transforma o array de categorias em outro array, mais com uma camada a mais , o path
    const categoriesWithPath = categories.map(category => {
      let path = category.name; // path iniciado com o nome da categoria
      let parent = getParent(categories, category.parentId);

      // enquanto tiver parent, continua procurando e concatenando para ter o path completo
      while (parent) {
        path = `${parent.name} > ${path}`;
        parent = getParent(categories, parent.parentId);
      }

      return { ...category, path };
    });

    // ordenar categorias por ordem alfabetica
    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });
    return categoriesWithPath;
  };

  //retornar as categorias
  const get = (req, res) => {
    app
      .db("categories") // se for todos não precisa fazer um select
      .then(categories => res.json(withPath(categories))) //retorna o array de categorias com path
      .catch(err => res.status(500).send(err));
  };
  const getById = (req, res) => {
    app
      .db("categories")
      .where({ id: req.params.id })
      .first()
      .then(category => res.json(category))
      .catch(err => res.status(500).send(err));
  };
  return { save, remove, get, getById };
};
