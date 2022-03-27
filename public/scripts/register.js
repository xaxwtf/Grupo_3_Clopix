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

 
//valido los input 
//validate name
registerForm.nombreCompleto.addEventListener('keydown', nameValidate);

function nameValidate(){
    if(registerForm.nombreCompleto.value < 2 ){
        registerForm.nombreCompleto.style.borderColor= 'red';
    }else {
        registerForm.nombreCompleto.style.borderColor= 'inherit';
    }
} 
//validate email
registerForm.mail.addEventListener('keydown', mailValidate);

function mailValidate(){
    if(!ValidateEmail(registerForm.mail.value)){
        registerForm.mail.style.borderColor= 'red';
    }else {
        registerForm.mail.style.borderColor= 'inherit';
    }
} 

//validate password (hay que corregit pero no es tan necesario)
registerForm.pasword.addEventListener('keydown', passwordValidate);

function passwordValidate(){
    if(registerForm.pasword.value < 8 ){
        registerForm.pasword.style.borderColor= 'red';
    }else {
        registerForm.pasword.style.borderColor= 'inherit';
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