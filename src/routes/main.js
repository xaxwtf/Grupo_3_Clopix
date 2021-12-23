const express=require('express');
const home=require('../controllers/mainCtrl');
const rutas=express.Router();
rutas.get('/', home.mostrar);

module.exports=rutas;