const db = require("../../../database/models");



const actorsAPIController = {
  list: (req, res) => {
    db.User.findAll().then((users) => {
      let respuesta = {
        meta: {
          status: 200,
          total: users.length,
          url: "api/users",
        },
        data: users,
      };
      res.json(respuesta);
    });
  },

  detail: (req, res) => {
    db.Actor.findByPk(req.params.id).then((actor) => {
      let respuesta = {
        meta: {
          status: 200,
          total: actor.length,
          url: "/api/user/:id",
        },
        data: actor,
      };
      res.json(respuesta);
    });
  },
  actorMovies: (req, res) => {
    db.Actor.findByPk(req.params.id, {
      include: ["movies"],
    }).then((actor) => {
      let respuesta = {
        meta: {
          status: 200,
          total: actor.length,
          url: "/api/user/:id",
        },
        data: actor,
      };
      res.json(respuesta);
    });
  },
  create: (req, res) => {
    Actors.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rating: req.body.rating,
      favorite_movie_id: req.body.favorite_movie_id,
    })
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/user/create",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/users/create",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },
  update: (req, res) => {
    let actorId = req.params.id;
    users
      .update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          rating: req.body.rating,
          favorite_movie_id: req.body.favorite_movie_id,
        },
        {
          where: { id: actorId },
        }
      )
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/users/update/:id",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 204,
              total: confirm.length,
              url: "api/users/update/:id",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },
  destroy: (req, res) => {
    let actorId = req.params.id;
    Users.destroy({ where: { id: actorId }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then((confirm) => {
        let respuesta;
        if (confirm) {
          respuesta = {
            meta: {
              status: 200,
              total: confirm.length,
              url: "api/users/delete/:id",
            },
            data: confirm,
          };
        } else {
          respuesta = {
            meta: {
              status: 204,
              total: confirm.length,
              url: "api/actors/delete/:id",
            },
            data: confirm,
          };
        }
        res.json(respuesta);
      })
      .catch((error) => res.send(error));
  },
};

module.exports = actorsAPIController;
