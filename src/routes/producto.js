const express = require('express');
const path=require('path');

const multer=require('multer');
const productoCtrl= require('../controllers/productoCrl');
const routers= express.Router();

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/product'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })
const upload = multer({ storage });
routers.get('/Carrito',productoCtrl.Carrito);
routers.delete('/Carrito/:id/eliminar', productoCtrl.eliminarDelCarrito);     


routers.get('/',productoCtrl.Catalogo); ///listar productos
routers.get('/Create',productoCtrl.alta); //form de creacion de productos
routers.get('/:id',productoCtrl.Detalle); ///detalle de un producto en particular
routers.post('/',upload.single('imagenProducto'),productoCtrl.CrearProducto);  ///accion de creacion (donde se envia los formularios)
routers.get('/:id/edit',productoCtrl.edit); /// form de edicion de productos
routers.put('/:id',productoCtrl.editar); ///accion de edicion(donde se envia el formulario)
routers.delete('/:id',productoCtrl.baja); ///accion de borrado



module.exports=routers;
