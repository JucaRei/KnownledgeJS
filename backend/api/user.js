// criptografar a senha do usuário, sempre que receber
const bcrypt = require("bcrypt-nodejs");

//representa a instancia do express (index.js)
module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body }; // novo usuario / req.body pega o corpo da requisição (body-parser)
    if (req.params.id) user.id = req.params.id; // alterar usuário

    try {
      //validações
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      //verificar se o usuário já não existe no banco de dados (acessando o knex)
      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first(); // first - quero somente o usuário e não uma lista de usuário

      // se o id não estiver setado
      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      // erro do lado do cliente
      return res.status(400).send(msg);
    }
    user.password = encryptPassword(user.password); //criptogrando a senha do user
    delete user.confirmPassword;

    // se atualizar deu certo
    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  //pega uma lista de usuários
  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ id: req.params.id })
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err));
  };
  // first - apenas 1 unico usuário
  return { save, get, getById };
};
