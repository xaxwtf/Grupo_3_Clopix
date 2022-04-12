const registerForm = document.forms['swapImage'];
let error=false;

let enviar=document.querySelector("button#cambiarImagen"); ///requiero el boton del cambiar imagen para desactivarlo por defecto
enviar.disabled=true;


/**validacion del cambio de imagen!!!! */
registerForm.newAvatar.addEventListener("change", ()=>{
    let imageValue = registerForm.newAvatar.value;
    let extensionesAceptadas = /(.jpg|.jpeg|.png|.gif)$/i;
    if(imageValue != ""){ 
        if (!extensionesAceptadas.exec(imageValue)) {
            document.querySelector('p.error#newAvatar').innerHTML= 'Formato incorrecto';
            registerForm.newAvatar.style.borderColor= 'red';
            error= true;

        }
        else{
            registerForm.newAvatar.style.borderColor= 'inherit';
        }
        console.log("errores valor: ");
        if(!error){
            enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
        }
        error=false;
    }
});

const cambioPassword= document.forms['cambiarPass'];
cambioPassword.newpassword.addEventListener('blur',()=>{
    if(cambioPassword.newpassword.value.length<8){
        document.querySelector('p.error#newpassword').innerHTML= 'la contraseña debe tener al menos 8 caracteres';
        cambioPassword.newpassword.style.borderColor= 'red';
        enviar.disabled=true;
    }
    else{
        document.querySelector('p.error#newpassword').innerHTML= '';
        cambioPassword.newpassword.style.borderColor= 'inherit';
        enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
    }
    
});
cambioPassword.newpasswordConfirm.addEventListener('blur',()=>{

    if(cambioPassword.newpassword.value!=cambioPassword.newpasswordConfirm.value){
        document.querySelector('p.error#newpasswordConfirm').innerHTML= 'las contraseñas no coinciden';
        cambioPassword.newpasswordConfirm.style.borderColor= 'red';
        enviar.disabled=true;
    }
    else{
        cambioPassword.newpassword.style.borderColor= 'green';
        cambioPassword.newpasswordConfirm.style.borderColor= 'green';
        enviar.removeAttribute("disabled"); //solo va activar el boton cuando no halla ningun error
    }
});