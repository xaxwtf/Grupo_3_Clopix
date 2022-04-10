const db=require('../../database/models');

const api={

    listar:(req,res) => { 
        let objetoliteral = { 
            count:1,
            users:[]
        }
        db.Usuarios.findAll().then(resultado => { 
            objetoliteral.count=resultado.length; ///total de usuarios
            arrayDeUsuarios=Array();
            for(let i= 0; i < resultado.length ; i++){
                 aux={
                    id:resultado[i].id,
                    username:resultado[i].username,
                    email:resultado[i].email,
                    
                    phone:resultado[i].phone,
                    full_name:resultado[i].full_name,
                    avatar_image:"https://grupo3cloplixv2.herokuapp.com/images/avatar/"+resultado[i].avatar_image,///"https://grupo3cloplixv2.herokuapp.com/images/avatar/"

                 }
                 arrayDeUsuarios.push(aux);
            }
            objetoliteral.users=arrayDeUsuarios;
            return res.json(objetoliteral);
        });

        
    },
    get:(req, res)=>{
        db.Usuarios.findByPk(req.params.id).then(resultado=>{
            aux={
                id:resultado.id,
                username:resultado.username,
                email:resultado.email,
                phone:resultado.phone,
                full_name:resultado.full_name,
                avatar_image:"https://grupo3cloplixv2.herokuapp.com/images/avatar/"+resultado.avatar_image,
             }
             return res.json(aux);
        });
        
    }
}


module.exports=api;