const registerForm = document.forms['altaP'];
let error=false;

let enviar=document.querySelector("button#AgregarProducto"); ///requiero el boton del cambiar imagen para desactivarlo por defecto
enviar.disabled=true;


/**validacion del cambio de imagen!!!! */
registerForm.imgProduct.addEventListener("change", ()=>{
    let imageValue = registerForm.imgProduct.value;
    let extensionesAceptadas = /(.jpg|.jpeg|.png|.gif)$/i;
    console.log("el valor de la imagen es");
    console.log(imageValue);
    if(imageValue != ""){ 
        if (!extensionesAceptadas.exec(imageValue)) {
            document.querySelector('#errorimgProduct').innerHTML= 'Formato incorrecto';
            registerForm.imgProduct.style.borderColor= 'red';
            error= true;
        }
        else{
            registerForm.imgProduct.style.borderColor= 'inherit';
        }
        console.log("errores valor: ");
        if(!error){
            enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
        }
        error=false;
    }
});
registerForm.nombre.addEventListener("blur",()=>{
    if(registerForm.nombre.value.length<5){
        document.querySelector('#nombre').innerHTML= 'el nombre debe tener al menos 5 caracteres';
        registerForm.nombre.style.borderColor= 'red';
        enviar.disabled=true;
    }
    else{
        document.querySelector('#nombre').innerHTML= '';
        registerForm.nombre.style.borderColor= 'inherit';
        enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
    }
});

registerForm.descripcion.addEventListener("blur",()=>{
    console.log("registerForm.descripcion.value");
    if(registerForm.descripcion.value.length<20){
        document.querySelector('#descripcion').innerHTML= 'la Descripcion debe tener al menos 20 caracteres';
        registerForm.descripcion.style.borderColor= 'red';
        enviar.disabled=true;
    }
    else{
        document.querySelector('#descripcion').innerHTML= '';
        registerForm.descripcion.style.borderColor= 'inherit';
        enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
    }
});

registerForm.precio.addEventListener("blur",()=>{
    
    if(registerForm.precio.value<1){
        document.querySelector('#precio').innerHTML= 'el precio debe ser mayor a 0';
        registerForm.precio.style.borderColor= 'red';
        enviar.disabled=true;
    }
    else{
        document.querySelector('#precio').innerHTML= '';
        registerForm.precio.style.borderColor= 'inherit';
        enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
    }
});
registerForm.stock.addEventListener("blur",()=>{
    
    if(registerForm.stock.value<1){
        document.querySelector('#stock').innerHTML= 'debe existir al menos 1 unidad';
        registerForm.stock.style.borderColor= 'red';
        enviar.disabled=true;
    }
    else{
        document.querySelector('#stock').innerHTML= '';
        registerForm.stock.style.borderColor= 'inherit';
        enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
    }
});