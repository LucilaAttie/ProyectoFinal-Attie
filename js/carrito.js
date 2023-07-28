let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const total = document.querySelector("#total");

function cargarProductosCarrito () {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
    
        carritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML= `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <h3>Producto</h3>
                     <p>${producto.titulo}</p>
                </div>
    
                <div class="carrito-producto-cantidad">
                     <h3>Cantidad</h3>
                     <p>x ${producto.cantidad}</p>
                 </div>
                        
                <div class="carrito-producto-precio">
                     <h3>Precio</h3>
                     <p>$ ${producto.precio}</p>
                </div>
    
                <div class="carrito-producto-subtotal">
                     <h3>Subtotal</h3>
                     <p>$ ${producto.precio * producto.cantidad}</p>
                 </div>
                        
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `
            carritoProductos.append(div);
    
        })
        
        
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarProductosCarrito ();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar");

    botonesEliminar.forEach (boton => { 
        boton.addEventListener ("click", eliminarDelCarrito)
    });

}

function eliminarDelCarrito (e) {
    Toastify({
        text: "Se eliminó el producto",
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
            x: '150px', 
            y: '30px' 
          },
        onClick: function(){} 
      }).showToast();


    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index,1);
    cargarProductosCarrito ();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarTotal() {
    const calculoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${calculoTotal}`;

}