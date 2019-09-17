// const user = require('../api/user')  - seria assim sem o consign

// no consign dentro de app, ja vai ter função save, do /api/user
module.exports = app => {
  app
    .route("/users")
    .post(app.api.user.save)
    .get(app.api.user.get);

  app
    .route("/users/:id")
    .put(app.api.user.save)
    .get(app.api.user.getById);

  app
    .route("/categories")
    .get(app.api.category.get)
    .post(app.api.category.save);

  app
    .route("/categories/:id")
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove);

  app.route('/articles')
    .get(app.api.article.get)
    .post(app.api.article.save)

  app.route('/articles/:id')
    .get(app.api.article.getById)
    .put(app.api.article.save)
    .delete(app.api.article.remove)
};
