const req = require('express/lib/request');
const bycript=require('bcryptjs');
const db=require('../../database/models');
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
        db.Usuarios.findOne({
            where: { 
                
            }
            })
    
    },
    crear:(req,res)=>{
        const errors = validationResult(req);
        let passEncrip=bycript.hashSync(req.body.pasword,3);
        let image="imagendeperfil.png";
        let todoOk = true;
        console.log("estos son los errores!!!!!!!!!!!!!!!!!");
        console.log(errors);
        if (!errors.isEmpty()) {
          return res.render('Users/register',{errors: errors.mapped(),old:req.body});
        }
        if(!bycript.compareSync(req.body.passwordConfirm, passEncrip)){
            console.log("las contraseñas no coinciden");
            return res.render("Users/register",{ errors: { passwordConfirm: { msg:"error, las contraseñas no coinciden"}}});
        }
       //valido por user unico
        db.Usuarios.findOne({ 
            where:{ 
                username: req.body.user
            }
        }).then(resultado => { 
            if (resultado != undefined) {
                todoOk=false;
            }
        });
        //valido por mail unico
        db.Usuarios.findOne({ 
            where:{ 
                email:req.body.mail
            }
        }).then(resultado => { 
            if (resultado != undefined) {
                todoOk=false;
            }
        });
        if(req.body.file){
           image= req.file.filename;
        }
        if (todoOk) {
            let nuevo={
                avatar_image:image,
                full_name:req.body.nombreCompleto,
                email:req.body.mail,
                username:req.body.user,
                password:passEncrip,
                phone:req.body.celular,
                rol_id:2
            } 
            db.Usuarios.create(nuevo); 
        }
            res.redirect("/");
        
        res.redirect("Users/register");
        
    },
    logear:(req,res)=>{
        let us=usuarios.findByAll("user",req.body.user);
        
        console.log(us);
        db.Usuarios.findOne({include:"Rol"},{
            where:{
                user:req.body.user
            }
        }).then(resultado=>{
            if(req.body.user==resultado.username && bycript.compareSync(req.body.password,resultado.pasword)&&resultado.rol=="admin" ){
                admin={ 
                    user:req.body.user,
                    pasword:"$2a$10$2oQJw5CU/tkhxYsWu5vPg.GA/S4JSx0r6.PnakbvSM8fFal1zonQS"
                }
                req.session.userLogged=admin;
                return res.redirect("/admin/menu");
            }
            else if(req.body.password == resultado.password && bycript.compareSync(req.body.password,resultado.password)){
                req.session.userLogged={ 
                    user:resultado.username,
                    pasword: resultado.password
                }; 
                return res.redirect("/user/"+us.user+"/profile");
            }
            else{
                 res.redirect("/user/login");
            }
        }).catch(error=>console.log(error));
        
       
        
        
    }, 
    perfil:(req,res) => { 
        res.render('Users/perfil',{usuario: req.session.userLogged});
    },
    unLoged:(req,res)=>{
        req.session.destroy();
        return res.redirect("/");
    },
    editProfile:(req,res) => { 
        db.Usuarios.update({ 
         password: bycript.hashSync(req.body.newpassword)
        },{
        where: {
            username: req.params.user
        }
        });
        res.redirect("/Producto/"+req.params.user+"/Profile");
    }
}

module.exports=user;
