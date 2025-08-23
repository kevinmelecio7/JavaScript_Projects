//Variables

const todo = document.querySelector('#todo')
const doing = document.querySelector('#doing')
const done = document.querySelector('#done')
const listaToDo = document.querySelector('#lista-todo')
const listaDoing = document.querySelector('#lista-doing')
const listaDone = document.querySelector('#lista-done')
let  toDos = [];
let  doings = [];
let  dones = [];

eventListeners();

function eventListeners(){
    todo.addEventListener('submit', agregarToDo); // Cuando se agrega
    doing.addEventListener('submit', agregarDoing); // Cuando se agrega
    done.addEventListener('submit', agregarDone); // Cuando se agrega

    //Evento para cuando el HTML este cargado en su totalidad...
    document.addEventListener('DOMContentLoaded', () => {
        toDos = JSON.parse(localStorage.getItem('toDos')) || []; //intenta buscar los "toDos" y si no tiene, manda un arreglo vacio
         crearHTML(); // muestra lo guardado en local storage
    });
    document.addEventListener('DOMContentLoaded', () => {
        doings = JSON.parse(localStorage.getItem('doings')) || []; //intenta buscar los "doings" y si no tiene, manda un arreglo vacio
         crearHTML(); // muestra lo guardado en local storage
    });
    document.addEventListener('DOMContentLoaded', () => {
        dones = JSON.parse(localStorage.getItem('dones')) || []; //intenta buscar los "dones" y si no tiene, manda un arreglo vacio
         crearHTML(); // muestra lo guardado en local storage
    });
}

function agregarToDo(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet-todo').value;
    // console.log(tweet);
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    } 

    const tweetObj = {
        id: Date.now(),
        // tweet: tweet
        tweet // es lo mismo al de arriba
    }

    toDos = [...toDos, tweetObj];
    // console.log(toDos);

    crearHTML();

    todo.reset();
}

function agregarDoing(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet-doing').value;
    // console.log(tweet);
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    } 

    const tweetObj = {
        id: Date.now(),
        // tweet: tweet
        tweet // es lo mismo al de arriba
    }

    doings = [...doings, tweetObj];
    // console.log(toDos);

    crearHTML();

    doing.reset();
}

function agregarDone(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet-done').value;
    // console.log(tweet);
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    } 

    const tweetObj = {
        id: Date.now(),
        // tweet: tweet
        tweet // es lo mismo al de arriba
    }

    dones = [...dones, tweetObj];
    // console.log(toDos);

    crearHTML();

    done.reset();
}



function mostrarError(error){
    const mensaje = document.createElement('p');
    mensaje.textContent = error;
    mensaje.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 3000)
}

//Mostrar listado de los toDos
function crearHTML(){
    limpiarHTML()
    if(toDos.length > 0){
        toDos.forEach( tweet => {
            //Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir una funcion de eliminar
            btnEliminar.onclick = () => {
                borrarToDo(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            //Añadir texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el html
            listaToDo.appendChild(li)
        })
    }

    if(doings.length > 0){
        doings.forEach( tweet => {
            //Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir una funcion de eliminar
            btnEliminar.onclick = () => {
                borrarDoing(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            //Añadir texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el html
            listaDoing.appendChild(li)
        })
    }

    if(dones.length > 0){
        dones.forEach( tweet => {
            //Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir una funcion de eliminar
            btnEliminar.onclick = () => {
                borrarDone(tweet.id);
            }

            //Crear el html
            const li = document.createElement('li');

            //Añadir texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el html
            listaDone.appendChild(li)
        })
    }

    sincronizarStorage(); 
}

function limpiarHTML(){
    while (listaToDo.firstChild){
        listaToDo.removeChild(listaToDo.firstChild);
    }
    while (listaDoing.firstChild){
        listaDoing.removeChild(listaDoing.firstChild);
    }
    while (listaDone.firstChild){
        listaDone.removeChild(listaDone.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('toDos', JSON.stringify(toDos));
    localStorage.setItem('doings', JSON.stringify(doings));
    localStorage.setItem('dones', JSON.stringify(dones));
}

function borrarToDo(id){
    toDos = toDos.filter(tweet => tweet.id !== id);
    crearHTML();
}

function borrarDoing(id){
    doings = doings.filter(tweet => tweet.id !== id);
    crearHTML();
}

function borrarDone(id){
    dones = dones.filter(tweet => tweet.id !== id);
    crearHTML();
}