const express=require('express');
const home=require('../controllers/mainController');
const guestTest=require('../myMiddlewares/guestTest');
const rutas=express.Router();
rutas.get('/', home.mostrar);
rutas.get('/404', home.notFound);
rutas.get('/admin/menu',guestTest.admin,home.menuAdmin);
module.exports=rutas;