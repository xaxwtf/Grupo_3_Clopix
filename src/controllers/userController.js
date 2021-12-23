const req = require('express/lib/request');
const archivosJson=require('../model/jsonDataBase');
let usuarios=archivosJson('Usuarios');
const user={
    login:(req, res)=>{
        res.render('Users/login');
    },
    registro:(req, res)=>{
        res.render('Users/register');
    },
    edit:(req,res)=>{
        /** lo que va hacer */
    },
    crear:(req,res)=>{
        let nuevo={
            id:1,
            nombreCompleto:req.body.nombreCompleto,
            mail:req.body.mail,
            usuario:req.body.usuario,
            pasword:req.body.pasword,
            celular:req.body.celular
        }
        usuarios.create(nuevo);
        res.redirect("/");
    },
    logear:(req,res)=>{
        res.send("Logeado con exito!!!!!!");
    }
    
}
module.exports=user;