// console.log(laptops); // trae toda la base de datos en db.js

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const ram = document.querySelector('#ram');
const almacenamiento = document.querySelector('#almacenamiento');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    ram: '',
    almacenamiento: '',
    color: '',
};

//Even listener para los select de busqueda
marca.addEventListener('change', e => {    datosBusqueda.marca = e.target.value;    filtralaptop();});
year.addEventListener('change', e => {    datosBusqueda.year = parseInt(e.target.value);    filtralaptop();});
minimo.addEventListener('change', e => {    datosBusqueda.minimo = e.target.value;    filtralaptop();});
maximo.addEventListener('change', e => {    datosBusqueda.maximo = e.target.value;    filtralaptop();});
ram.addEventListener('change', e => {    datosBusqueda.ram = e.target.value;    filtralaptop();});
almacenamiento.addEventListener('change', e => {    datosBusqueda.almacenamiento = e.target.value;    filtralaptop();});
color.addEventListener('change', e => {    datosBusqueda.color = e.target.value;    filtralaptop();});


const max = new Date().getFullYear();
min = max - 10;

//el siguiente DOMContentLoaded signidifca que "una vez que carge el html, llama a la siguiente funcion"
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarlaptops(laptops); //muestra informacion de la lista al cargar

    llenarSelect();
})



function mostrarlaptops(laptops){
    limpiarHTML(); //Elimina el html previo

    laptops.forEach(laptop => {
        const { marca, modelo, year, ram, almacenamiento, precio, color} = laptop
        const laptopHTML = document.createElement('p');

        laptopHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${ram} RAM - Almacenamiento: ${almacenamiento} - Precio: ${precio} - Color: ${color}
        `;

        resultado.appendChild(laptopHTML);
    })
}

//Limpiar html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

//Generar una lista
function llenarSelect(){
    for( let i = max; i >= min; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i
        year.appendChild(opcion);
    }
}

//function que filtra en base a la busqueda
function filtralaptop(){ 
    const resultado = laptops.filter( filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarMax).filter(filtrarRam).filter(filtrarAlmacenamiento).filter(filtrarColor) ;
    // console.log(resultado);
    if(resultado.length) {
        mostrarlaptops(resultado);
    } else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado';
    resultado.appendChild(noResultado);
}

function filtrarMarca(laptop){
    const {marca} = datosBusqueda;
    if(marca) {
        return laptop.marca === marca;
    }
    return laptop;
}

function filtrarYear(laptop){
    const {year} = datosBusqueda;
    if(year) {
        return laptop.year === year;
    }
    return laptop;
}

function filtrarMin(laptop){
    const {minimo} = datosBusqueda;
    if(minimo) {
        return laptop.precio >= minimo;
    }
    return laptop;
}

function filtrarMax(laptop){
    const {maximo} = datosBusqueda;
    if(maximo) {
        return laptop.precio <= maximo;
    }
    return laptop;
}

function filtrarRam(laptop){
    const {ram} = datosBusqueda;
    if(ram) {
        return laptop.ram === parseInt(ram);
    }
    return laptop;
}

function filtrarAlmacenamiento(laptop){
    const {almacenamiento} = datosBusqueda;
    if(almacenamiento) {
        return laptop.almacenamiento === almacenamiento;
    }
    return laptop;
}

function filtrarColor(laptop){
    const {color} = datosBusqueda;
    if(color) {
        return laptop.color === color;
    }
    return laptop;
}