const home={

    mostrar:(req, res)=>{
        res.render('index');
    },

    notFound: (req, res)=> {
        res.render('404');
    },
    menuAdmin: (req, res)=>{
        res.render('Products/MenuAdmin');
    }
    
}
module.exports=home;