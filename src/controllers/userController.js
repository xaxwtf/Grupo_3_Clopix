const bycript=require('bcryptjs');
const db=require('../../database/models');
const { validationResult } = require('express-validator');
const fs=require('fs');
const { log, Console } = require('console');
const user={
    login:(req, res)=>{
        res.render('Users/login');
    },
    registro:(req, res)=>{
        res.render('Users/register');
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
        if(req.body.file && (path.extname(req.file.originalname)==".png" || path.extname(req.file.originalname)==".gif" || path.extname(req.file.originalname)==".jpeg" )){
           image= req.file.filename;
        }
        else
        {
            if(req.session.productoActual!="defecto.png"){
                try {
                    fs.unlinkSync(__dirname+"/../../public/images/avatar/"+req.file.filename);
                    console.log('File removed');
                } catch(err) {
                    console.error('Something wrong happened removing the file', err);
                  }
            }
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
            res.redirect("/");
        }
        else{
            if(req.file.filename!="defecto.png"){
                try {
                    fs.unlinkSync(__dirname+"/../../public/images/avatar/"+req.file.filename);
                    console.log('File removed');
                } catch(err) {
                    console.error('Something wrong happened removing the file', err);
                  }
            }
        }
            
        
        res.redirect("User/register");
        
    },
    logear:(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("HAY ERRORES AL LOGEAR!!!!");
            return res.render('Users/login',{errors: errors.mapped(),old:req.body});
        }
        db.Usuarios.findOne({
            where:{
                username:req.body.user
            },
            include:[{association:"Roles"}]
        }).then(resultado=>{

            if(resultado!= undefined && resultado.Roles.name_rol=='admin' && req.body.user==resultado.username && bycript.compareSync(req.body.pasword,resultado.password) ){
                console.log("soy admin!!!!!!!!!!!!!!!!!!!!!!!!!");
                admin={ 
                    user:req.body.user,
                    pasword:resultado.password,
                    tipe:resultado.Roles.name_rol
                }
                req.session.userLogged=admin;
                return res.redirect("/admin/menu");
            }
            else if(resultado!=undefined &&resultado.Roles.name_rol == 'client' && req.body.user == resultado.username && bycript.compareSync(req.body.pasword,resultado.password)){
                console.log("soy CLIENT!!!!!!!!!!!!!!!!!!!!!!!!!");
                req.session.userLogged={ 
                    user:resultado.username,
                    pasword: resultado.password,
                    tipe:resultado.Roles.name_rol
                }; 
                return res.redirect("/user/"+resultado.username+"/profile");
            }
            else{
                console.log("No entra a ningun iff");
                 res.render('Users/login',{ notExist:true})

            }                                   
        }) 
    }, 
    perfil:(req,res) => {
        db.Usuarios.findOne({where:{username:req.session.userLogged.user }}).then(resultado=>{
            res.render('Users/perfil',{usuario: resultado});
        })
        
    },
    unLoged:(req,res)=>{
        req.session.destroy();
        return res.redirect("/");
    },
    
    editProfile:(req , res) => { 
        db.Usuarios.findOne({
            where:{
                username:req.params.user
            }
        }).then(r=>{
            console.log("EL VALOR DE REQ.BODY.PREV");
            console.log(req.body.prevPassword);
            if( bycript.compareSync(req.body.prevPassword,r.password)&& req.body.newpassword==req.body.newpasswordConfirm){
                db.Usuarios.update({ 
                    password: bycript.hashSync(req.body.newpassword,3)
                   },{
                where: {
                       username: req.params.user
                   }
                });
                console.log("PASSWORD CAMBIADA CORRECTAMENTE")
                res.redirect("/User/"+req.params.user+"/Profile");

            }
            else{
                console.log("EL R TIENE");
                console.log(r);
            }
        }).catch(error=>console.log(error));
        
        
        
    },
    editImageProfile:(req , res)=>{
        db.Usuarios.findOne({
            where:{ 
                username:req.params.user
            }
        }).then(result=>{
            
            if(result.avatar_image!="imagendeperfil.png"){
                try {
                    fs.unlinkSync(__dirname+"/../../public/images/avatar/"+result.avatar_image);
                    console.log('File removed');
                } catch(err) {
                    console.error('Something wrong happened removing the file', err);
                }
            }
            db.Usuarios.update({
                avatar_image:req.file.filename
            },{
                where:{
                    username:req.params.user
                }
            });
            res.redirect("/user/"+req.params.user+"/profile");
        })
    } 
}

module.exports=user;
