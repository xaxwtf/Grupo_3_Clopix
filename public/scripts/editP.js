const registerForm = document.forms['mproducto'];
let error=false;




/**validacion del cambio de imagen!!!! */
registerForm.newImageProduct.addEventListener("change", ()=>{
    let imageValue = registerForm.newImageProduct.value;
    let extensionesAceptadas = /(.jpg|.jpeg|.png|.gif)$/i;
    console.log("el valor de la imagen es");
    console.log(imageValue);
    if(imageValue != ""){ 
        if (!extensionesAceptadas.exec(imageValue)) {
            document.querySelector('#errornewImageProduct').innerHTML= 'Formato incorrecto';
            registerForm.newImageProduct.style.borderColor= 'red';
            registerForm.newImageProduct.value="";
        }
        else{
            registerForm.newImageProduct.style.borderColor= 'inherit';
        }
    }
    else{
        
        registerForm.newImageProduct.style.borderColor= 'inherit';
    }
});
registerForm.newNombre.addEventListener("blur",()=>{

    if(registerForm.newNombre.value!=""){
        if(registerForm.newNombre.value.length<5){
            document.querySelector('#errornewNombre').innerHTML= 'el nombre debe tener al menos 5 caracteres';
            registerForm.newNombre.style.borderColor= 'red';
            registerForm.newNombre.value="";
      
        }
        else{
            document.querySelector('#errornewNombre').innerHTML= '';
            registerForm.newNombre.style.borderColor= 'inherit';
            
        }
    }
    else{
        console.log("no hay Nombre  cargado!!!!");
        registerForm.newNombre.style.borderColor= 'inherit';
    } 
    
});

registerForm.newDescripcion.addEventListener("blur",()=>{
   
    if(registerForm.newDescripcion.value!=undefined){
        if(registerForm.newDescripcion.value.length<20){
            document.querySelector('#errornewDescripcion').innerHTML= 'la Descripcion debe tener al menos 20 caracteres';
            registerForm.newDescripcion.style.borderColor= 'red';
            registerForm.newDescripcion.value="";
        }
        else{
            document.querySelector('#errornewDescripcion').innerHTML= '';
            registerForm.newDescripcion.style.borderColor= 'inherit';

            
        }
    }
    else{
        registerForm.newDescripcion.style.borderColor= 'inherit';
       
    }
    
});

registerForm.newPrice.addEventListener("blur",()=>{
    
    if(registerForm.newPrice.value!=undefined){
        if(registerForm.newPrice.value<1){
            document.querySelector('#errornewPrice').innerHTML= 'el precio debe ser mayor a 0';
            registerForm.newPrice.style.borderColor= 'red';
            registerForm.newPrice.value=undefined;
         
        }
        else{
            document.querySelector('#newnewPrice').innerHTML= '';
            registerForm.newPrice.style.borderColor= 'inherit';
           
        }
    }
    else{
        registerForm.newPrice.style.borderColor= 'inherit';
    }
   
});
registerForm.newStock.addEventListener("blur",()=>{
    
    if(registerForm.newStock.value!=undefined){
        if(registerForm.newStock.value){
            if(registerForm.newStock.value<1){
                document.querySelector('#errornewStock').innerHTML= 'debe existir al menos 1 unidad';
                registerForm.newStock.style.borderColor= 'red';
                registerForm.newStock.value="";
            }
            else{
                document.querySelector('#errornewStock').innerHTML= '';
                registerForm.newStock.style.borderColor= 'inherit';
               
            }
        }
    }
    else{
        registerForm.newStock.style.borderColor= 'inherit';
    }
    
    
});
