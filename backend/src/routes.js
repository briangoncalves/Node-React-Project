const express = require('express');
const companyController = require('./controllers/companyController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/company', companyController.index);
routes.post('/company', companyController.create);

routes.get('/incident', incidentController.index);
routes.post('/incident', incidentController.create);
routes.delete('/incident/:id', incidentController.delete);

routes.get('/profile', profileController.index);

module.exports = routes;
