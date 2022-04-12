const registerForm = document.forms['registerForm'];


let error=false;
//CORRIGIENDO, CAMBIO KEYDOWN POR BLUR
let enviar=document.querySelector("#crearUsuario"); 
enviar.disabled=true;
//valido los input 

//validacion de imagenes de perfil

registerForm.avatar.addEventListener("blur", imageValidator);

function imageValidator() {
    let imageValue = registerForm.avatar.value;
    let extensionesAceptadas = /(.jpg|.jpeg|.png|.gif)$/i;

    if(imageValue != ""){ 
        if (!extensionesAceptadas.exec(imageValue)) {
            document.querySelector('div.avatar-input p.error').innerHTML= 'Formato incorrecto'
            error= true;
           }

    }

}

//validate name

registerForm.nombreCompleto.addEventListener('blur', nameValidate);
function nameValidate(){
    if(registerForm.nombreCompleto.value < 2 ){
        registerForm.nombreCompleto.style.borderColor= 'red';
    }else {
        registerForm.nombreCompleto.style.borderColor= 'inherit';
    }
      //blur
    
      if(registerForm.nombreCompleto.value == 0) {
          error=true
        document.querySelector('p#errName').innerHTML= 'El campo es obligatorio';
        
    }
} 
//validate email
registerForm.mail.addEventListener('blur', mailValidate);

function mailValidate(){
    if(!ValidateEmail(registerForm.mail.value)){
        registerForm.mail.style.borderColor= 'red';
        error=false;
    }else {
        registerForm.mail.style.borderColor= 'inherit';
    }
     //blur
    
     if(registerForm.mail.value == 0) {
        document.querySelector('p#errMail').innerHTML= 'El campo es obligatorio';
        error=false;
    }
} 

//validate password 

registerForm.pasword.addEventListener('blur', passwordValidate);

function passwordValidate(){
    console.log("ESTE ES EL VALOD DE INPUT PASSWORD");
    console.log(registerForm.pasword.value);

    if(registerForm.pasword.value.length < 8 ){
        

        registerForm.pasword.style.borderColor= 'red';
        document.querySelector('p#errorPasword').innerHTML= 'la contraseña debe tener al menos 8 caracteres';
        error=true;
    }

    else {
        registerForm.pasword.style.borderColor= 'inherit';
    }
} 


//Blur Confirm password
registerForm.passwordConfirm.addEventListener('blur', passwordConfirmValidate);

function passwordConfirmValidate(){

    if(registerForm.passwordConfirm.value != registerForm.pasword.value) {
        error=true;
        registerForm.passwordConfirm.style.borderColor= 'red';
        document.querySelector('p#errConfirmPassword').innerHTML= 'Las contraseñas no coinciden';
    }
    else {
        registerForm.passwordConfirm.style.borderColor= 'green';
    }
        
    }

    //Blur celular
    registerForm.celular.addEventListener('blur', celularValidate);
    function celularValidate() {
        if(registerForm.celular.value == 0) {
            error=true;
            document.querySelector('p#errCelular').innerHTML= 'El campo es obligatorio';
            registerForm.celular.style.borderColor= 'red';
    }else {
        registerForm.celular.style.borderColor= 'inherit';
    }
    }

    //blur nombre de usuario
    registerForm.user.addEventListener('blur', userValidate);
    function userValidate() {
        if(registerForm.user.value == 0) {
            error=true;
            document.querySelector('p#errUser').innerHTML= 'El campo es obligatorio';
            registerForm.user.style.borderColor= 'red';
    }else {
        registerForm.user.style.borderColor= 'inherit';
    }
}
//validando las validaciones!!!
if(!error){
    enviar.disabled=false;
}




//validacion de caracteres del email
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
    
  }
    return (false)
    
}
