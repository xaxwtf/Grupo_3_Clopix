const express = require('express');



const userController= require('../controllers/userController');
const userRoute= express.Router();

userRoute.get('/login',userController.login);
userRoute.get('/register',userController.registro);
userRoute.get('/editUser',userController.edit);
userRoute.post('/Alta',userController.crear)
userRoute.delete('/:id/Baja')
userRoute.put('/:id/editar')


module.exports=userRoute;
