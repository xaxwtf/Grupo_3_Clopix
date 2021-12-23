
const gArchivoJson=require('../model/controlDatos');
let vProductos=gArchivoJson('product');
let Detalle=gArchivoJson('listaComprasTest');
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
        let ins= req.params.id;
        vProductos.delete(ins);
        res.redirect('/Producto');
    },
    edit:(req, res)=>{
        let id=req.params.id;
        res.render('Products/ModificarProducto',{producto:vProductos.find(id)});
    },
    editar:(req,res)=>{
        let id=req.params.id;
        let actual=vProductos.find(id);
        
        if(req.body.newNombre!=""){
            actual.nombre=req.body.newNombre;
        }
        if(req.body.newDescripcion!="")
        {
            actual.descripcion=req.body.newDescripcion;
        }
        if(req.body.newPrecio!=""){
            actual.precio=req.body.newPrecio;
        }
        vProductos.update(actual);
        res.redirect("/Producto/"+id+"/edit");
    }
    ,
    Catalogo:(req, res)=>{
        res.render('Products/productDetail',{producto:vProductos.readFile()});
    },
    
    Detalle:(req, res)=>{
        let ins=req.params.id;
        let recuperado=vProductos.find(ins);
        res.render('Products/unProducto',{ unP: recuperado });
    },
    Carrito:(req, res)=>{
        res.render('Products/CarritoCompras',{ DetalleCompra: Detalle.readFile()});
    },
    CrearProducto:(req,res)=>{
        let nuevo= {
            id : null,
            nombre: req.body.nombre,
            image: "/images/product/"+req.file.filename,
            descripcion: req.body.descripcion,
            talle: req.body.talle, 
            precio: req.body.precio,
            unidades: req.body.unidades
        }
        vProductos.create(nuevo);
        res.redirect('/Producto/');
    }
    
}
module.exports=producto;