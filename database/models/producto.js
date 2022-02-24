module.exports=(sequelize,DataTypes)=>{
    let alias="Productos";
    let cols={
        id:{ 
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nameProduct:{
            type:DataTypes.STRING
        },
        description:{
            type:DataTypes.STRING
        },
        priceUnit:{
            type:DataTypes.DOUBLE
        },
        talle_id:{
            type:DataTypes.INTEGER,
        },
        image_product:{
            type:DataTypes.STRING
        },
        stock:{
            type:DataTypes.INTEGER
        }
    };
    let config={
        tableName:'products',
        timestamps:false
    };
    const producto=sequelize.define(alias,cols,config);
    producto.associate=function(models){
        producto.belongsTo(models.Talles,{
            as:"talles",
            foreignKey:"talle_id"
        });
    }
    return producto;
}