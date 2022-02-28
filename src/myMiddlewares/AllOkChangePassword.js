const db=require('../../database/models')
const bycript= require('bcryptjs')
function todoOkSwapPassword(req, res , next){
    console.log("EMPIEZO A BUSCAR EN LA BASE DE DATOS"+req.params.user);
    db.Usuarios.findOne({ 
        where:{
            username:req.params.user
        }
    }).then(resultado=>{
        if(req.body.newpassword==req.body.newpasswordConfirm &&req.body.prevPassword!=undefined && bycript.compareSync(req.body.prevPassword,resultado.password)){
            next();
        }
        else{
            console.log(" HAY ERRORES Y TE REGRESO");
            return res.redirect("/user/"+req.params.user+"/profile");
            
        }
    }).catch(error=>console.log(error));
    
} 
module.exports=todoOkSwapPassword;