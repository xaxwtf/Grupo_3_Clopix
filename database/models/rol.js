module.exports=(sequelize,DataTypes)=>{
    let alias="Rol";
    let cols={
        rol_id:{ 
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name_rol:{
            type:DataTypes.STRING
        }
    };
    let config={
        tableName:'rol',
        timestamps:false
    };
    const rol=sequelize.define(alias,cols,config);
    rol.associate=function(models){
        rol.hasMany(models.Usuarios,{
            as:"rol",
            foreignKey:"rol_id"
        });
    }
    return rol;
}