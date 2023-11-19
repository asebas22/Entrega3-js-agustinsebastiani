const tituprin = document.getElementById("apptitu")

tituprin.innerText="PAGINA DE EMPRENDEDORES 2023"

const textprin = document.getElementById("textopresen")

textprin.innerText="En esta pagina te brindamos la herramiento de un formulario. para que vayas completando con el producto que estas considerando incoporar a tu stock. Anotando su nombre, su costo y tipo. Una vez que tengas decidido adquirir el producto. Podes sumarlo al stock que ya tenes. Tene en cuenta que el formulario no guarda los cambios es solo para que lo tengas en consideracion momentanea. Para agruegar un producto podes sumarlo en la seccion Gestion de Stock. Tambien para tu consideracion tenes un listado de los produtos No disponibles en Stock"



const formu = document.getElementById("formu");
const contenedorProductos = document.getElementById("contenedor-de-productos");

formu.addEventListener("submit", guardar);

function guardar(e) { 
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let costo = document.getElementById("costo").value;
    let tipo = document.getElementById("tipo").value;

    const producto = {
        nombre: nombre,
        costo: costo,
        tipo: tipo
    }

    const nuevoDiv = document.createElement("div");
    nuevoDiv.classList.add("nuevo-div");
    nuevoDiv.innerHTML = `
    <h2 class="titulo" >${producto.nombre}</h2>
    <p class="segundo">Costo: $${producto.costo}</p>
    <p class="segundo">Tipo: ${producto.tipo}</p>
`;

    contenedorProductos.appendChild(nuevoDiv);

    formu.reset();
}

let carrito = [];


 document.getElementById("agregarCarrito")

.addEventListener("click", agregarAlCarrito );




function agregarAlCarrito() {

    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById("cantidad").value;

   
    if (producto && cantidad) {
        
        const nuevoElemento = {
            producto: producto,
            cantidad: cantidad
        };

        
        carrito.push(nuevoElemento);

        
        actualizarVisualizacionCarrito();

        
        guardarEnLocalStorage();

         
         Swal.fire({
            title: "Producto agregado al carrito",
            text: `${cantidad} x ${producto}`,
            icon: "success"
        });
    } else {
        alert("Por favor, complete tanto el producto como la cantidad.");
    }
}


function actualizarVisualizacionCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");


    listaCarrito.innerHTML = "";

   
    carrito.forEach(elemento => {
        const li = document.createElement("li");
        li.textContent = `${elemento.cantidad} x ${elemento.producto}`;
        listaCarrito.appendChild(li);
    });
}


function guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function cargarDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarVisualizacionCarrito();
    }
}


cargarDesdeLocalStorage();



const pedirprod = async () => {
    const contenedor = document.querySelector(".contenedor-yacarga");
    const resp = await fetch("./prod.js");
    const productos = await resp.json();
    
    productos.forEach(prod => {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${prod.nombre}</h4>`;
      contenedor.appendChild(div);
    });
  };
  
  pedirprod(); 
