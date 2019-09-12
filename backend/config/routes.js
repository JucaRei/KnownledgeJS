// const user = require('../api/user')  - seria assim sem o consign

// no consign dentro de app, ja vai ter função save, do /api/user
module.exports = app => {
  app.route("/users").post(app.api.user.save);
};
