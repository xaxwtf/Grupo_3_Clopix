const express = require('express');



const userCtrl= require('../controllers/userCtrl');
const userRoute= express.Router();

userRoute.get('/login',userCtrl.login);
userRoute.get('/register',userCtrl.registro);
userRoute.get('/editUser',userCtrl.edit);
userRoute.post('/Alta',userCtrl.crear)
userRoute.delete('/:id/Baja')
userRoute.put('/:id/editar')


module.exports=userRoute;
