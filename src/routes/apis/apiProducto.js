const express = require('express');
const apiRouters = express.Router();
const apiProduct = require("../../controllers/apiControllerProduct");

apiRouters.get("/products",apiProduct.listar);

apiRouters.get("/products/:id",apiProduct.get);


module.exports = apiRouters;