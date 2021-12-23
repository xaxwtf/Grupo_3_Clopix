const express=require('express');
const home=require('../controllers/mainController');
const rutas=express.Router();
rutas.get('/', home.mostrar);

module.exports=rutas;