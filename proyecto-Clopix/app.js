const express = require('express');
const app = express();
app.use(express.static('public'));


app.listen (process.env.PORT ||3001, ()=>{
    console.log('Servidor funcionando bien');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/registro', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});