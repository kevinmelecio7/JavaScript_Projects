// Variables
const carrito = document.querySelector('#carrito');                                 //div del carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody');         //tabla del carrito (solo el TBODY cuerpo de la tabla)
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');                 //boton de vaciar carrito
const listaCursos = document.querySelector('#lista-cursos');                        //lista de los cursos (CARDS)
let articulosCarrito = [];                                                          //Arreglo del carrito

cargarEventListeners()
function cargarEventListeners(){
    listaCursos.addEventListener('click',agregarCurso); //Cuando el usuario da clic en el boton de "Agregar al carrito"
    carrito.addEventListener('click',eliminarCurso); //Cuando el usuario da clic en el carrito y desea eliminar elemento de la lista

    //vaciar carrito si el usuario le da clic en el boton de "Vaciar Carrito"
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
    }) 
}


function agregarCurso(e){
    e.preventDefault() // como el boton de "Agregar al carrito" en html tiene "<a href="#" ..."  el href intenta llevar a otra enlace pero en este caso como tiene "#" lo intenta,
                        //con "preventDefault()" evitaremos que se recorra hacia arriba como si se refrescara, ya no lo hara


    // console.log(e.target.classList);         //si das clic en el boton te muestra "agregar-carrito", pero si le das en la imagen no aparece porque esta en otro div
                                                //validar que si el click que hizo el usuario contiene el elemento "agregar-carrito", identificando que el clic fue hecho sobre el boton
    if(e.target.classList.contains('agregar-carrito')){
        // console.log('Agregando al carrito...');

        // console.log(e.target); //nivel boton
        // console.log(e.target.parentElement); // nivel texto
        // console.log(e.target.parentElement.parentElement); // nivel imagen (todo el card)
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);

    }    
}

function eliminarCurso(e){
    // console.log(e.target.classList);   
    if(e.target.classList.contains('borrar-curso')){
        // console.log(e.target); 
        // console.log(e.target.getAttribute('data-id')); 

        const cursoId = e.target.getAttribute('data-id'); // se tiene el ID a eliminar

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId) //traer todos los demas elementos que no contengan el id que se desa eliminar
        // console.log(articulosCarrito);

        carritoHTML(); //mostrar carrito
    }
}


//lee el contenido del html al que le dimos clic y extrae la informacion en curso
function leerDatosCurso(curso){
    console.log(curso); //para apoyarse como buscar el contenido de la informacion 

    // Crear un objeto con el contenido del "curso"
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.info-card .precio span').textContent,
        id: curso.querySelector('.info-card a').getAttribute('data-id'),
        cantidad : 1
    }
    // console.log(infoCurso);

    //revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizar cantidad +1
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los ob jetos que no son duplicados 
            }
        })
    }else {
        //agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]   // los "..." indica que tomara una copia de lo que tiene la variable 'articulosCarrito'
    }

    
    
    console.log(articulosCarrito);

    carritoHTML();
}


//  Muestra el carrito de compras en el html
function carritoHTML(){

    //Limpiar el HTML del carrito
    limpiarHTML();

    //Recorre el carrito y genera HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso; //declarar variables que corresponden de la objeto "curso"

        const row = document.createElement('tr');

        row.innerHTML = `<td> <img src="${imagen}" width="100" />  </td>
                        <td> ${titulo} </td>
                        <td> ${precio} </td>
                        <td> ${cantidad} </td>
                        <td> <a href="#" class="borrar-curso" data-id ="${id}"> X </a> </td>`;

        //agrega el HTML creado en el body
        contenedorCarrito.appendChild(row);
    })
}



function limpiarHTML(){
    // contenedorCarrito.innerHTML ="";     //este metodo es lento, mejor utilizar lo de abajo...
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}