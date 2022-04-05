const db=require('../../database/models');

const api={

    listar:(req,res) => { 
        let objetoliteral = { 
            count:1,
            countByCategory:{}, 
            products:[]
        }

        db.Productos.findAll({include:[{association:"talles"}]}).then(resultado => { 
            objetoliteral.count=resultado.length; ///total de productos
            arrayDeProductos=Array();
            for(let i= 0; i < resultado.length ; i++){
                 aux={
                     id:resultado[i].id,
                     nameProduct:resultado[i].nameProduct,
                     description:resultado[i].description,
                     priceUnit:resultado[i].priceUnit,
                     talle:resultado[i].talles.name_size,
                     image_product:"https://grupo3cloplixv2.herokuapp.com/images/product/"+resultado[i].image_product,
                     stock:resultado[i].stock,
                     detail:"api/products/"+resultado[i].id
                 }
                 arrayDeProductos.push(aux);
            }
            objetoliteral.products=arrayDeProductos;

        });
        /** cargando las categorias + su cantidad de productos*/
        db.Talles.findAll({include:[{association:"Talle"}]}).then(resultado => { 
            for(let i=0;i<resultado.length;i++){

                Object.defineProperty(countByCategory, resultado[i].name_size,{
                    value: resultado[i].Talle.length,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
        });
        return res.json.status(200)(objetoliteral);
    },
    get:(req, res)=>{
        db.Productos.findByPk(req.params.id,{include:[{association:"talles"}]}).then(resultado=>{
            aux={
                id:resultado.id,
                nameProduct:resultado.nameProduct,
                description:resultado.description,
                priceUnit:resultado.priceUnit,
                talle:resultado.talles.name_size,
                image_product:"https://grupo3cloplixv2.herokuapp.com/images/product/"+resultado.image_product,
                stock:resultado.stock,
            }
        })
        return res.json.status(200)(aux);
    }
}


module.exports=api;