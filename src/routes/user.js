const express = require('express');
const path=require('path');
const multer  = require('multer');
const { body } = require('express-validator');
const userController= require('../controllers/userController');
const userTest=require('../myMiddlewares/guestTest');

let validationUser=[
   body('nombreCompleto').notEmpty().isLength({min:3}).withMessage("el nombre debe tener al menos 3 caracteres"),
   body('mail').notEmpty().withMessage("Campo Obligatorio").bail(),
   body('user').notEmpty().isLength({min:3}).withMessage("el usuario debe tener al menos 3 caracteres").bail(),
   body('celular').notEmpty().isLength({ max:8}).withMessage("el numero indicado debe tener 8 numeros").bail(),
   body('pasword').notEmpty().isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres").bail(),
   body('passwordConfirm').notEmpty().withMessage("Campo Obligatorio").bail(),
   body('terminosyCondiciones').notEmpty().withMessage("Campo Obligatorio").bail()
];

const userRoute= express.Router();


const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/avatar'); 
    }, 
    filename: function (req, file, cb){ 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  
      } 
  });

  const upload = multer({ storage });

console.log(storage);

userRoute.get('/login',userController.login);
userRoute.post('/loading',userController.logear);
userRoute.get('/editUser',userController.edit);
userRoute.post('/Alta', upload.single('avatar'),validationUser, userController.crear);
userRoute.delete('/:id/Baja');
userRoute.put('/:id/editar');
userRoute.get('/register',userController.registro);
userRoute.get('/:user/profile',userTest.isLogged,userController.perfil);
userRoute.get('/unloged',userController.unLoged);
userRoute.put('/:user/editPerfil',userController.editProfile); 









module.exports=userRoute;
