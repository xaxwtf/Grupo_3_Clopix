const express = require('express');
const productoCtrl= require('../controllers/productoCrl');
const routers= express.Router();

routers.get('/alta',productoCtrl.alta);
routers.get('/edit',productoCtrl.edit);
routers.get('/Catalogo',productoCtrl.Catalogo);
routers.get('/Carrito',productoCtrl.Carrito);


module.exports=routers;
