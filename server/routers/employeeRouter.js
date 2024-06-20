const express = require('express')
const employeeController = require('../controllers/employeeController')
const Router = express.Router();

Router
    .post('/add',employeeController.createEmployee)
    .get('/get',employeeController.getAll)
    .get('/getById/:objectId',employeeController.getById)
    .patch('/edit/:objectId',employeeController.editEmployee);

module.exports = Router;