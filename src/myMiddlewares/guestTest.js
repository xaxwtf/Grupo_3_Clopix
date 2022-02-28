const bcrypt = require("bcryptjs/dist/bcrypt");

const userTest={
    logged:(req, res,next )=>{
        if(req.session.userLoded){
            return res.redirect('/user/'+req.session.userLoded.user+'/profile');
        }
        next();
    },
    isLogged:(req, res, next )=>{
        console.log(req.session.userLogged);
        if(!req.session.userLogged){
            return res.redirect('/user/login');
        }
        next();
        
    },
    admin:(req, res, next)=>{
        us= req.session.userLogged;
        console.log("CONTROLADOR ADMIN");
        console.log(req.session.userLogged);
        if( req.session.userLogged  && us.user=="admin" && us.tipe=="admin"){  
            console.log("estoy logeado!!!!!");    
            next();
        }
        return res.redirect("/user/login");
    }
}

module.exports=userTest;