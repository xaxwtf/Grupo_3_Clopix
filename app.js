const express = require('express');
const app = express();
const methodOverride= require("method-override");
///cargando rutas
const rutaPrincipal=require('./src/routes/main');
const rutaP=require('./src/routes/producto');
const rutaUser=require('./src/routes/user');
const isLogged=require('./src/myMiddlewares/connexionOk');
const isAdmin=require("./src/myMiddlewares/isAdmin");
const session=require('express-session')
const apiRouters=require("./src/routes/apis/apisRouter");


app.set('view engine','ejs'); /** establezco que voy a usar ejs */
app.set('views',__dirname+'/src/views');/** seteo la ruta en la que va buscar los archivos ejs */

app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));
app.use(session({secret: "cuando cree esto solo dios y yo sabiamos como funciona, ahora solo dios sabe"}));
/**aplicacion de mis propios midlewares */
app.use(isLogged);
app.use(isAdmin);

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/',rutaPrincipal);
app.use('/Producto',rutaP);
app.use('/User',rutaUser);
app.use('/Api',apiRouters);


app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
});

app.listen (process.env.PORT ||3001, ()=>{
    console.log('Servidor funcionando bien');
});




