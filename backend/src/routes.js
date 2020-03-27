const express = require('express');
const companyController = require('./controllers/companyController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

const { celebrate, Segments, Joi } = require('celebrate');

routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required()
    })
  }),
  sessionController.create
);

routes.get('/company', companyController.index);
routes.post(
  '/company',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(14),
      city: Joi.string().required(),
      state: Joi.string()
        .required()
        .length(2)
    })
  }),
  companyController.create
);

routes.get(
  '/incident',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  incidentController.index
);

routes.post(
  '/incident',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number()
        .required()
        .min(1)
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  incidentController.create
);

routes.delete(
  '/incident/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  incidentController.delete
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  profileController.index
);

module.exports = routes;
