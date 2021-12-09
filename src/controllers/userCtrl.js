const user={
    login:(req, res)=>{
        res.render('login');
    },
    registro:(req, res)=>{
        res.render('register');
    },
    edit:(req,res)=>{
        /** lo que va hacer */
    }
    
}
module.exports=user;