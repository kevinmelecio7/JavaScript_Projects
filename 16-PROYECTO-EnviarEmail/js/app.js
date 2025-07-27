 // VALIDAR QUE YA FUE CARGADO TODO EL HTML
document.addEventListener('DOMContentLoaded', function(){

    // Selecciona los elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputTelefono = document.querySelector('#telefono');
    const inputDireccion = document.querySelector('#direccion');

    const formulario = document.querySelector('#formulario');

    const email = {
        nombre: '',
        email: '',
        telefono: 'N/A',
        direccion: ''
    }

    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    // console.log(inputEmail);
    // console.log(inputTelefono);
    // console.log(inputDireccion);

    //Asignar eventos 
    // inputEmail.addEventListener('blur', function(e){
    //     console.log(e.target.value); // obtener el valor de el campo
    // });

    // inputTelefono.addEventListener('blur', function(e){
    //     console.log(e.target.value); // obtener el valor de el campo
    // });

    // inputDireccion.addEventListener('blur', function(e){
    //     console.log(e.target.value); // obtener el valor de el campo
    // });

    inputNombre.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputTelefono.addEventListener('input', validar);
    inputDireccion.addEventListener('input', validar);

    btnReset.addEventListener('click', function(e){
        e.preventDefault(); // prevenir o no dejar hacel el evento por default
        resetFormulario();
    });

    const spinner = document.querySelector('#spinner');

    formulario.addEventListener('submit', enviarEmail); // se activa cuando da clic en el boton de Submit

    // BLUR     --- evento se activa cuando abandonas un campo
    // INPUT    --- evento se activa cuando tecleas uno a uno

    function validar(e){
        //traversing de DOM --- buscar los elemento de hijo hacia padre
        // console.log(e.target); // componente donde se ejecuta el evento
        // console.log(e.target.parentElement); //componente PADRE del componente donde se ejecuta el evento

        // if(e.target.id === 'telefono' && e.target.value != '' && !validarTelefono(e.target.value)){
        //     mostrarAlerta(`El campo ${e.target.id} no es valido`, e.target.parentElement);
        //     email[e.target.name] = 'N/A';
        //     comprobarEmail();
        //     return;
        // }

        if(e.target.id === 'telefono'){
            // console.log(e.target.value);
            if(e.target.value === ''){
                // console.log(`Primera condicion`);
                limpiarAlerta(e.target.parentElement);
                email[e.target.name] = 'N/A';
                comprobarEmail();
                return;
            }
            if( !validarTelefono(e.target.value)){
                // console.log(`Segunda condicion`);
                mostrarAlerta(`El campo ${e.target.id} no es valido`, e.target.parentElement);
                email[e.target.name] = '';
                comprobarEmail();
                return;
            }
            // comprobarEmail();
        } 

        if(e.target.value.trim()  === '' && e.target.id != 'telefono'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        // console.log(Object.values(email)); 
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El campo ${e.target.id} no es valido`, e.target.parentElement);
             email[e.target.name] = '';
             comprobarEmail();
            return;
        }

        

        
        

        limpiarAlerta(e.target.parentElement);

        //Asginar los valores, paso la validacion
        email[e.target.name] = e.target.value.trim().toLowerCase(); //Se asignara el valor si pasa la validacion

        //Comprobar Email  
        comprobarEmail();

        

    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia)

        //Generar alerta en HTML
        const error = document.createElement('P');//crea parrafo
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        // console.log(error); //muestra  <p>Hubo un error...</p>

        //Inyectar el error al formulario
        // formulario.innerHTML = error.innerHTML; //Sustituye el formulario por el mensaje de error
        referencia.appendChild(error); //Append Child lo pondra despues del elemento Formulario
    }
 
    function limpiarAlerta(referencia){
         //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        // console.log(alerta);
        if(alerta){
            alerta.remove(); //elimina el que tiene y el siguiente paso realiza
        }
    }

    function validarEmail(email){
        //Expresion regular para identificar un email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        // console.log(resultado);
        return resultado; // true or false
    }

    function validarTelefono(telefono){
        const resultado = telefono.length === 10 && telefono.split('').every(ch => ch >= '0' && ch <= '9');
        if(resultado === true)
            email.telefono = telefono;
        else 
            email.telefono = 'N/A';
        // console.log("Validar telefono " + resultado);
        // console.log(email);
        return resultado; // true or false
    }

    function comprobarEmail(){
        // console.log(Object.values(email)); // convierte en arreglo
        // console.log(Object.values(email).includes('')); // ayuda averiguar si alguno de los atriutos del objeto son diferentes de vacio

        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50'); //quita la opacidad del boton
            btnSubmit.disabled = true; // habilta el boton
        } else {
            btnSubmit.classList.remove('opacity-50'); //quita la opacidad del boton
            btnSubmit.disabled = false; // habilta el boton
        }
    }

    function enviarEmail(e){
        //mostrara el icono de carga en el formulario
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden'); 
        
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden'); 

            //Crear alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounder-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000); //se ocultara despues de 3 segundos

        resetFormulario();
    }

    function resetFormulario(){
        email.nombre = '';
        email.email = '';
        email.telefono = 'N/A';
        email.direccion = '';
        comprobarEmail()
        formulario.reset();// reset al formulario
    }
    

});