let productos = [];

fetch ("./js/productos.json")
    .then (response => response.json())
    .then (data => {
        productos = data;
        cargarProductos(productos)
    })

const contendorProductos = document.querySelector ("#contenedor-productos");
const botonesCategorias = document.querySelectorAll (".boton-categoria");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numeroCarrito = document.querySelector ("#numero-carrito");

function cargarProductos(prodcutosSeleccionados) {

    contendorProductos.innerHTML = "";

    prodcutosSeleccionados.forEach(producto => {

        const div = document.createElement ("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">  
                <div class="producto-detalles-info"> 
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                     <p class="producto-precio">$ ${producto.precio}</p> 
                </div>
                    
             <button class="producto-agregar" id= "${producto.id}"><i class="bi bi-cart-plus pr-2"></i> Agregar al carrito</button>
            
        `;

        contendorProductos.append(div);
    }) 

    actualizarBotonesAgregar ();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("seleccionado"));
        e.target.classList.add("seleccionado");

        if (e.target.id != "todos") {
            const categoriaSeleccionada = productos.filter(producto => producto.categoria.id === e.target.id);
            cargarProductos(categoriaSeleccionada);
        } else {
            cargarProductos(productos);

        }
        

    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll (".producto-agregar");

    botonesAgregar.forEach (boton => { 
        boton.addEventListener ("click", agregarAlCarrito)
    });

}

let productosEnCarrito;

let productosEnCarritoLocalStorage = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLocalStorage) {

    productosEnCarrito = JSON.parse(productosEnCarritoLocalStorage);
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    Toastify({
        text: "Se agrego un producto al carrito",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "#000000",
          borderRadius: "50px"
        },
        offset: {
            x: '100px', 
            y: '50px' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.target.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad =1;
        productosEnCarrito.push(productoAgregado);
    }  

    actualizarNumeroCarrito ();


    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

function actualizarNumeroCarrito() { 
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito;
}