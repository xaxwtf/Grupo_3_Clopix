function esAdmin(req, res,next){
    res.locals.isAdmin=false;
    console.log(req.session.userLogged);
    if(req.session.userLogged && req.session.userLogged.tipe=="admin"){
        res.locals.isAdmin=true;
        
    }
    console.log("Soy ADMIN?:"+res.locals.isAdmin);
    next();
}
module.exports=esAdmin;