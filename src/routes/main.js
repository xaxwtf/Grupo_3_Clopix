const express=require('express');
const home=require('../controllers/mainCtrl');
const rutas=express.Router();
rutas.get('/', home.mostrar);

/*
rutas.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/src/views/login.html');
});

rutas.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/src/views/register.html');
});

rutas.get('/Catalogo', (req,res)=>{
    res.sendFile(__dirname + '/src/views/productDetail.html');
});

rutas.get('/register2', (req,res)=>{
    res.sendFile(__dirname + '/src/views/register2.html');
});*/
module.exports=rutas;