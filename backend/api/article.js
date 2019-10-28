const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validator     // destructuring (acessando os atributos dentro desse objeto, e expondo 2 variaveis com o mesmo nome das funções( que está dentro de app.api.validator))

    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id

        //validações
        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg)       //erro do lado do cliente
        }

        //persistir dados (erro 50 lado do servidor)
        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    //deletar 1 artigo
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    /* -paginar consultas relacionadas a artigo
    - limitar a consulta para trazer apenas 10 registros
    - (req.query e não params) caso o atributo não esteja setado, uso pagina 1 como padrão (vai ser a primeira pagina a se exibida no consulta paginada)
    - offset é o deslocamento que preciso fazer para trazer os dados
    - res.json({ data: articles, count, limit }))  atributo data - retorna artigo, a paginação com o limite de artigos por pagina
    */
    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()     // armazenar o resultado em uma variavel e contar o numero de registros tem na base de dados (importante para saber quantas paginas por elementos serão
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }
    // passando para string, porque ele vem no formato binário

    /*acessar as categorias filhas dos filhos, e trazer todos os arquivos associados daquele elemento pra baixo
    consulta recursiva psql
    função middleware ou seja que recebe req e resp*/
    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }
    //consulta que vai obter os artigos / a: apelido dessa tabela  - orderBy /artigos dos mais novos pros mais antigos

    return { save, remove, get, getById, getByCategory }
}