const producto={
    alta:(req, res)=>{
        res.render('Products/AltaProducto.ejs');
    },
    baja:(req, res)=>{
        /** lo que va hacer */
    },
    edit:(req, res)=>{
        res.render('ModificarProducto');
    },
    Catalogo:(req, res)=>{
        res.render('productDetail');
    },
    Carrito:(req, res)=>{
        res.render('CarritoCompras');
    }
    
}
module.exports=producto;