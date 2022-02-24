module.exports=(sequelize,DataTypes)=>{
    let alias="Talles";
    let cols={
        size_id:{ 
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name_size:{
            type:DataTypes.STRING
        }
    };
    let config={
        tableName:'talles',
        timestamps:false
    };
    const talle=sequelize.define(alias,cols,config);
    talle.associate=function(models){
        talle.hasMany(models.Productos,{
            as:"Talle",
            foreignKey:"talle_id"
        });
    }
    return talle;
}