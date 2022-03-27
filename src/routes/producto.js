const express = require('express');
const path=require('path');
const { body } = require('express-validator');
const multer=require('multer');
const productoControlador= require('../controllers/productoController');


const testUserLogged=require("../myMiddlewares/guestTest");
const { nextTick } = require('process');
const routers= express.Router();
let validationProduct=[
   body('nombre').notEmpty().withMessage("el Nombre es un campo Obligatorio").isLength({min:5}).withMessage("el nombre debe tener al menos 5 caracteres").bail(),
   body('descripcion').isLength({min:20}).withMessage("Debe tener al menos 20 caracteres").bail(),
   body('precio').notEmpty().withMessage("Debe Indicar un Precio!").isNumeric().withMessage("ingrese solo Numeros").bail(),
];

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/product'); 
    }, 
    filename: function (req , file, cb){ 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  
      }
  });
const upload = multer({ storage });
routers.get('/Carrito',productoControlador.Carrito);
routers.delete('/Carrito/:id/eliminar', productoControlador.eliminarDelCarrito);     
routers.post('/:id/agregarCarrito',productoControlador.AgregarAlCarrito);

routers.get('/',productoControlador.Catalogo); ///listar productos 



routers.get('/Create',testUserLogged.admin,productoControlador.alta); //form de creacion de productos
routers.get('/:id',productoControlador.Detalle); ///detalle de un producto en particular

routers.post('/Create',upload.single('imgProduct'), validationProduct, productoControlador.CrearProducto);  ///accion de creacion (donde se envia los formularios)

routers.get('/:id/edit',testUserLogged.admin,productoControlador.edit); /// form de edicion de productos
routers.put('/:id/edit',upload.single('newImageProduct'),productoControlador.editar); ///accion de edicion(donde se envia el formulario)
routers.delete('/:id',productoControlador.baja); ///accion de borrado



module.exports=routers;
