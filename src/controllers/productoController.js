
const gArchivoJson=require('../model/controlDatos');
let dataProductos=gArchivoJson('product');
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
        dataProductos.delete(ins);
        res.redirect('/Producto');
    },
    edit:(req, res)=>{
        let id=req.params.id;
        res.render('Products/ModificarProducto',{producto:dataProductos.find(id)});
    },
    editar:(req,res)=>{
        let id=req.params.id;
        let actual=dataProductos.find(id);
        
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
        dataProductos.update(actual);
        res.redirect("/Producto/"+id+"/edit");
    }
    ,
    Catalogo:(req, res)=>{
        res.render('Products/productDetail',{producto:dataProductos.readFile()});
    },
    
    Detalle:(req, res)=>{
        let ins=req.params.id;
        let recuperado=dataProductos.find(ins);
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
        dataProductos.create(nuevo);
        res.redirect('/Producto/');
    },
    AgregarAlCarrito:(req,res)=>{
        let id=req.params.id;
        let recuperado=dataProductos.find(id);
        recuperado.unidades-1;
        let copia=recuperado;
        copia.unidades=1;
        Detalle.create(copia);
        res.redirect("/Producto/Carrito")
    }
    
}
module.exports=producto;