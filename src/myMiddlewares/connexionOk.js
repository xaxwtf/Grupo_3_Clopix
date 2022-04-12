function connexionOk(req, res,next){
    res.locals.loggedIsTrue=false;
    res.locals.userLogeado="";
    console.log("logged is ");
    console.log(res.locals.loggedIsTrue);
    console.log(req.session.userLogged);
    if(req.session.userLogged){
        res.locals.loggedIsTrue=true;
        res.locals.userLogeado=req.session.userLogged.user;
        console.log(res.locals.loggedIsTrue);
    }
    next();
}
module.exports=connexionOk;