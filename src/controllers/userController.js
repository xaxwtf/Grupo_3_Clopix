const req = require('express/lib/request');
const archivosJson=require('../model/controlDatos');
let usuarios=archivosJson('Usuarios');
const bycript=require('bcryptjs');
const { validationResult } = require('express-validator');

const user={
    login:(req, res)=>{
        res.render('Users/login');
    },
    registro:(req, res)=>{
        res.render('Users/register');
    },
    edit:(req,res)=>{
        /*lo que va a hacer*/
    },
    crear:(req,res)=>{
        const errors = validationResult(req);
        let passEncrip=bycript.hashSync(req.body.pasword,3);
        let image="imagendeperfil.png";
        console.log("estos son los errores!!!!!!!!!!!!!!!!!");
        console.log(errors);
        if (!errors.isEmpty()) {
          return res.render('Users/register',{errors: errors.mapped(),old:req.body});
        }
        if(!bycript.compareSync(req.body.passwordConfirm, passEncrip)){
            console.log("las contraseñas no coinciden");
            return res.render("Users/register",{ errors: { passwordConfirm: { msg:"error, las contraseñas no coinciden"}}});
        }
        if(usuarios.findByAll('user',req.body.user)!=undefined){
            return res.render("Users/register",{ errors: { user: { msg:"error, el usuario ya esta en uso"}}});
        }
        if(usuarios.findByAll('mail',req.body.mail)!=undefined){
            console.log("el mail ya esta en uso");
            todoOk=false;
        }
        if(req.body.file){
           image= req.file.filename;
        }
            let nuevo={
                id:1,
                avatar:image,
                nombreCompleto:req.body.nombreCompleto,
                mail:req.body.mail,
                user:req.body.user,
                pasword:passEncrip,
                celular:req.body.celular

            }
            usuarios.create(nuevo);
            res.redirect("/");
        
        res.redirect("Users/register");
        
    },
    logear:(req,res)=>{
        let us=usuarios.findByAll("user",req.body.user);
        console.log(us);
        if(req.body.user=="admin" && bycript.compareSync(req.body.user,'$2a$10$2oQJw5CU/tkhxYsWu5vPg.GA/S4JSx0r6.PnakbvSM8fFal1zonQS') ){
            admin={ 
                user:req.body.user,
                pasword:"$2a$10$2oQJw5CU/tkhxYsWu5vPg.GA/S4JSx0r6.PnakbvSM8fFal1zonQS"
            }
            req.session.userLogged=admin;
            return res.redirect("/admin/menu");
        }
        else if(us!=undefined && bycript.compareSync(req.body.password,us.pasword)){
            req.session.userLogged=us; 
            return res.redirect("/user/"+us.user+"/profile");
        }
        else{
             res.redirect("/user/login");
        }
        
        
    }, 
    perfil:(req,res) => { 
        res.render('Users/perfil',{usuario: req.session.userLogged});
    },
    unLoged:(req,res)=>{
        req.session.destroy();
        return res.redirect("/");
    }
    
}

module.exports=user;