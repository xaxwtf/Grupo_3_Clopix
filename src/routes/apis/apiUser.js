const express = require('express');
const apiRouters = express.Router();
const apiUserController = require("../../controllers/apiControllerProduct");

apiRouters.get("/Users");

apiRouters.get("/products/:id");


module.exports = apiRouters;