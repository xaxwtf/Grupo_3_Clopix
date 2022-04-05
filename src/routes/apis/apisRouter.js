const express = require('express');
const apiRouters = express.Router();
const apiProduct = require("../../controllers/apiControllerProduct");
const apiUserController = require("../../controllers/apiControllerUser");


apiRouters.get("/products/",apiProduct.listar);
apiRouters.get("/products/:id",apiProduct.get);

apiRouters.get("/users/",apiUserController.listar);
apiRouters.get("/users/:id",apiUserController.get);

module.exports = apiRouters;