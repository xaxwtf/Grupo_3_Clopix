module.exports=(sequelize,DataTypes)=>{
    let alias="Usuarios";
    let cols={
        id:{ 
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        },
        full_name:{
            type:DataTypes.STRING,
        },
        avatar_image:{
            type:DataTypes.STRING
        },
        rol_id:{
            type:DataTypes.INTEGER
        }
    };
    let config={
        tableName:'users',
        timestamps:false
    };
    const user=sequelize.define(alias,cols,config);

    
    user.associate=function(models){
        user.belongsTo(models.Rol,{
            as:"Rol",
            foreignKey:"rol_id"
        });
    }
    return user;
}