const registerForm = document.forms['registerForm'];

registerForm.addEventListener('submit', function(event){
    event.preventDefault();
    let errors= false;

    //validacion de nombreCompleto
    if (this.nombreCompleto.value.length < 2){

        errors= true;
        document.getElementById('errName').innerHTML='El nombre tiene que tener más de 2 caracteres';
    } 

    /*validacion de mail*/ 
    if(!ValidateEmail(this.mail.value)){
        errors = true;
        document.getElementById('errMail').innerHTML='Debe ser un E-mail válido';
    }
    //verifica si existen errores, si no los hay envia el form
    if(errors== false){
        registerForm.submit();
    }
     //validacion de contraseña
    if (this.pasword.value.length < 8){
        document.getElementById('errPassword').innerHTML='La contraseña debe tener al menos 8 caracteres';
    } 
});



//CORRIGIENDO, CAMBIO KEYDOWN POR BLUR
 
//valido los input 
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
        document.querySelector('p#errName').innerHTML= 'El campo es obligatorio';
        
    }
} 
//validate email
registerForm.mail.addEventListener('blur', mailValidate);

function mailValidate(){
    if(!ValidateEmail(registerForm.mail.value)){
        registerForm.mail.style.borderColor= 'red';
    }else {
        registerForm.mail.style.borderColor= 'inherit';
    }
     //blur
    
     if(registerForm.mail.value == 0) {
        document.querySelector('p#errMail').innerHTML= 'El campo es obligatorio';
        
    }
} 

//validate password 

registerForm.pasword.addEventListener('blur', passwordValidate);

function passwordValidate(){
    if(registerForm.pasword.value < 8 ){
        registerForm.pasword.style.borderColor= 'red';
    }else {
        registerForm.pasword.style.borderColor= 'inherit';
    }
    //blur
    
    if(registerForm.pasword.value == 0) {
        document.querySelector('p#errPassword').innerHTML= 'El campo es obligatorio';
        
    }

} 


//Blur Confirm password
registerForm.passwordConfirm.addEventListener('blur', passwordConfirmValidate);

function passwordConfirmValidate(){

    if(registerForm.passwordConfirm.value == 0 ){
        
        registerForm.passwordConfirm.style.borderColor= 'red';
    }else {
        registerForm.passwordConfirm.style.borderColor= 'inherit';
    }
    //blur
    
    if(registerForm.passwordConfirm.value == 0) {
        document.querySelector('p#errConfirmPassword').innerHTML= 'El campo es obligatorio';
    }
        
    }

    //Blur celular
    registerForm.celular.addEventListener('blur', celularValidate);
    function celularValidate() {
        if(registerForm.celular.value == 0) {
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
            document.querySelector('p#errUser').innerHTML= 'El campo es obligatorio';
            registerForm.user.style.borderColor= 'red';
    }else {
        registerForm.user.style.borderColor= 'inherit';
    }
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
