
const gArchivoJson=require('../model/controlDatos');
let Detalle=gArchivoJson('listaComprasTest');
const db=require('../../database/models');
const { validationResult } = require('express-validator');
const multer=require('multer');
const path=require('path');
const { log, Console } = require('console');

const producto={
    alta:(req, res)=>{
        res.render('Products/AltaProducto.ejs');
    },
    eliminarDelCarrito:(req, res)=>{
       let ins=req.params.id;
       Detalle.delete(ins);
       res.redirect('/Producto/Carrito');
    },
    baja:(req,res)=>{

        db.Productos.destroy({ 
            where:{ 
                id:req.params.id 
            }
        })
        res.redirect('/Producto');
    },
    edit:(req, res)=>{

        db.Productos.findOne({
            where:{
                id:req.params.id
            }
        }).then(resultado=>{
            res.render('Products/ModificarProducto',{producto:resultado});
        });
    },
    editar:(req,res)=>{
        
        let buffer={};
        let id=req.params.id;
        console.log("el file contiene:"+req.file);
        if(req.body.newDescripcion!=""){
            Object.defineProperty(buffer, "description",{
                value: req.body.newDescripcion,
                writable: true,
                enumerable: true,
                configurable: true
              });
        }
        if(req.body.newPrice!=undefined){
            Object.defineProperty(buffer, "priceUnit", {
                value: req.body.newPrice,
                writable: true,
                enumerable: true,
                configurable: true
              });
        }
        if(req.body.newNombre!=""){
            Object.defineProperty(buffer, "nameProduct", {
                value: req.body.newNombre,
                writable: true,
                enumerable: true,
                configurable: true
              });

        }
        
        if(req.file!=undefined && req.file.filename!=undefined){
            Object.defineProperty(buffer, "image_product",{
                value: req.file.filename,
                writable: true,
                enumerable: true,
                configurable: true
            });
            if(req.session.productoActual!="defecto.png"){
                try {
                    fs.unlinkSync(__dirname+"/../../public/images/product/"+req.session.productoActual.image_product);
                    console.log('File removed');
                } catch(err) {
                    console.error('Something wrong happened removing the file', err);
                  }
            }
        }
        if(req.body.stock>0){
            Object.defineProperty(buffer, "stock",{
                value: req.body.stock,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
        console.log(buffer);
        db.Productos.update(buffer,{where:{id:req.params.id}});
        res.redirect("/Producto/");
    },

    Catalogo:(req, res)=>{
        db.Productos.findAll({include:[{association:"talles"}]}).then(resultado=>{ 
            console.log("ESTO ES LO QUE TIENE DE RESULTADO");
            console.log(resultado);
            console.log(resultado.length);
           
            res.render('Products/productDetail',{producto:resultado})
        });
        
    },
    
    Detalle:(req, res)=>{
        db.Productos.findByPk(req.params.id,{include:[{association:"talles"}]}).then(resultado=>{
            
            req.session.productoActual=resultado;
            res.render('Products/unProducto',{ unP: resultado })
        });
    },
    Carrito:(req, res)=>{
        res.render('Products/CarritoCompras',{ DetalleCompra: Detalle.readFile()});
    },
    CrearProducto:(req,res)=>{
        console.log("esto contiene el FILEEEE");
        console.log(req.file.filename);
        let extencion=path.extname(req.file.filename);
        let errors = validationResult(req);

        if (!errors.isEmpty() || (extencion!='.jpg' && extencion!='.jpeg'&& extencion!='.png'&& extencion!='.gif') ) {
            let bufferErrors={errors: errors.mapped(),old:req.body, imgNovalida:true}
            try {
                fs.unlinkSync(__dirname+"/../../public/images/product/"+req.file.filename);
                console.log('File removed');
            } catch(err) {
                console.error('Something wrong happened removing the file', err);
            }

            if(!errors.isEmpty() && (extencion!='.jpg' && extencion!='.jpeg'&& extencion!='.png'&& extencion!='.gif') ){
                bufferErrors={errors: errors.mapped(),old:req.body, imgNovalida:true}
            }
            else if(!errors.isEmpty()){
                bufferErrors={errors: errors.mapped(),old:req.body, imgNovalida:false}
            }
            else if (extencion!='.jpg' && extencion!='.jpeg'&& extencion!='.png'&& extencion!='.gif'){
                bufferErrors={imgNovalida:true}
            }
            return res.render('Products/AltaProducto',bufferErrors);
        }

        let talleD;
        console.log("EL TALLE ES");
        console.log(req.body.talle.value);
        switch(req.body.talle){
            case 'S':
                talleD=1;
                break;
            case 'M':
                talleD=2;
                break;
            case 'L':
                talleD=3;
                break;
            case 'XL':
                talleD=4;
                break;
            case 'XXL':
                talleD=5;
                break;
            case 'XXL':
                talleD=6;
                break;

        }
        let nuevo= {
            nameProduct: req.body.nombre,
            image_product: req.file.filename,
            description: req.body.descripcion,
            talle_id: talleD, 
            priceUnit: req.body.precio,
            stock:req.body.stock
        }
        console.log("------------------------------------------------- voy por aca");
        console.log(nuevo);
    
        db.Productos.create(nuevo)

        res.redirect('/Producto/');
    },
    AgregarAlCarrito:(req,res)=>{
        db.Productos.findByPk(req.params.id).then(resultado=>{
            Detalle.create(resultado);
            /**falta en control de unidades y la creacion del registro de venta */
            res.redirect("/Producto/Carrito")
        })
        
    }
    
}
module.exports=producto;