
const gArchivoJson=require('../model/controlDatos');
let dataProductos=gArchivoJson('product');
let Detalle=gArchivoJson('listaComprasTest');
const db=require('../../database/models');

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
        }
        console.log(buffer);
        db.Productos.update(buffer,{where:{id:req.params.id}});
        res.redirect("/Producto/"+id+"/edit");
    },
    Catalogo:(req, res)=>{
        db.Productos.findAll({include:[{association:"talles"}]}).then(resultado=>res.render('Products/productDetail',{producto:resultado}));
        
    },
    
    Detalle:(req, res)=>{
        db.Productos.findByPk(req.params.id,{include:[{association:"talles"}]}).then(resultado=>res.render('Products/unProducto',{ unP: resultado }));
    },
    Carrito:(req, res)=>{
        res.render('Products/CarritoCompras',{ DetalleCompra: Detalle.readFile()});
    },
    CrearProducto:(req,res)=>{
        let talleD;
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
        console.log("esto es lo que devuelve file!!!!!");
        console.log(req.file.filename);
        let nuevo= {
            nameProduct: req.body.nombre,
            image_product: req.file.filename,
            description: req.body.descripcion,
            talle_id: talleD, 
            priceUnit: req.body.precio,
        }
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