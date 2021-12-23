const express = require('express');
const req = require('express/lib/request');
const app = express();
const methodOverride= require("method-override");
///cargando rutas
const rutaPrincipal=require('./src/routes/main');
const rutaP=require('./src/routes/producto');
const rutaUser=require('./src/routes/user');



app.set('view engine','ejs'); /** establesco que voy a usar ejs */
app.set('views',__dirname+'/src/views');/** seteo la ruta en la que va buscar los archivos ejs */

app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index');
});
app.use('/Producto',rutaP);
app.use('/User',rutaUser);

app.listen (process.env.PORT ||3001, ()=>{
    console.log('Servidor funcionando bien');
});

