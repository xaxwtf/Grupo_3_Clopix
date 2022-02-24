const express = require('express');
const path=require('path');

const multer=require('multer');
const productoControlador= require('../controllers/productoController');
const producto = require('../controllers/productoController');
const routers= express.Router();

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/product'); 
    }, 
    filename: function (req, file, cb){ 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  
      } 
  });
const upload = multer({ storage });
routers.get('/Carrito',productoControlador.Carrito);
routers.delete('/Carrito/:id/eliminar', productoControlador.eliminarDelCarrito);     
routers.post('/:id/agregarCarrito',productoControlador.AgregarAlCarrito);

routers.get('/',productoControlador.Catalogo); ///listar productos
routers.get('/Create',productoControlador.alta); //form de creacion de productos
routers.get('/:id',productoControlador.Detalle); ///detalle de un producto en particular
routers.post('/',upload.single('imagenProducto'),productoControlador.CrearProducto);  ///accion de creacion (donde se envia los formularios)
routers.get('/:id/edit',productoControlador.edit); /// form de edicion de productos
routers.put('/:id/edit',upload.single('newImageProduct'),productoControlador.editar); ///accion de edicion(donde se envia el formulario)
routers.delete('/:id',productoControlador.baja); ///accion de borrado



module.exports=routers;
