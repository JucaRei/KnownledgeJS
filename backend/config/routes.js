// const user = require('../api/user')  - seria assim sem o consign

// no consign dentro de app, ja vai ter função save, do /api/user
module.exports = app => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  // .all todos os metodos HTTP passarão por esse filtro, caso de problema de autenticação ele não permite chamar os outro métodos
  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get);

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.user.save)
    .get(app.api.user.getById);

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(app.api.category.get)
    .post(app.api.category.save);

  //Cuidado com ordem! Tem que vir antes /categories/:id
  app.route(('/categories/tree'))
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree)

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove);

  app.route('/articles')
    .all(app.config.passport.authenticate())
    .get(app.api.article.get)
    .post(app.api.article.save)

  app.route('/articles/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(app.api.article.save)
    .delete(app.api.article.remove)

  // o codigo esta em article , embora a url use categorias
  app.route('/categories/:id/articles')
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory)
};

