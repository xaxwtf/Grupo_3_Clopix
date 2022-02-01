function connexionOk(req, res,next){
    res.locals.loggedIsTrue=false;
    console.log("logged is ");
    console.log(res.locals.loggedIsTrue);
    console.log(req.session.userLogged);
    if(req.session.userLogged){
        res.locals.loggedIsTrue=true;
        console.log(res.locals.loggedIsTrue);
    }
    next();
}
module.exports=connexionOk;