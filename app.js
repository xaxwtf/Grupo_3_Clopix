const express = require('express');
const { login } = require('./src/controllers/userCtrl');
const app = express();
///cargando rutas
const rutaPrincipal=require('./src/routes/main');
const rutaP=require('./src/routes/producto');
const rutaUser=require('./src/routes/user');

app.use(express.static('public'));
app.set('view engine','ejs'); /** establesco que voy a usar ejs */
app.set('views',__dirname+'/src/views');/** seteo la ruta en la que va buscar los archivos ejs */


app.listen (process.env.PORT ||3001, ()=>{
    console.log('Servidor funcionando bien');
});
app.use('/',rutaPrincipal);
app.use('/Producto',rutaP);
app.use('/User',rutaUser);

