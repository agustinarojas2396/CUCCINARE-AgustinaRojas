// Definimos clase Producto
class Producto{
    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen; 
    }
}

// Definimos clase Carrito
class Carrito{
    constructor(id, producto, cantidad, total){
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = total;
    }
}

// Cargamos array con productos
const productos = 
[
    new Producto(0, "Milanesas con puré", 500, "./media/milaspapitas.jpeg"),
    new Producto(1, "Carne con papas al horno", 700, "./media/carneccpapas.jpeg"),
    new Producto(2, "Ñoquis con salsa boloñesa", 400, "./media/ñoquis con salsa.jpeg")
];

// Inicializamos array carrito vacio
var carrito = [];
var carritoId = 0;

// Recorremos array productos
productos.forEach(item => {
    // Generamos el html para cada producto
    document.getElementById("panelProductos").innerHTML = document.getElementById("panelProductos").innerHTML + "<div class='card' style='width: 18rem; ' id='card_producto" + item.id + "'><img src='" + item.imagen + "' class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>" + item.nombre + "</h5></div><ul class='list-group list-group-flush'><li class='list-group-item'>$ " + item.precio + "</li><li class='list-group-item'><a href='#' class='card-link' onclick='seleccionCantidad("+ item.id +")'>Seleccione la cantidad</a></li><li class='list-group-item' style='display:none' color='black' id='liCantProducto_"+ item.id +"'>Cantidad:&nbsp;&nbsp;<p id='cantidadProducto_" + item.id +"'></p></li></ul><div class='card-body'><a href='#panelCarrito' color='black' class='card-link' onclick='agregarItem("+ item.id +")'>Agregar al carrito</a></div></div>";
});

// Funcion que me permite ingresar la cantidad de productos que quiero agregar al carrito
function seleccionCantidad(productoId){
    let cantidad = prompt("Ingrese la cantidad:");

    document.getElementById("liCantProducto_" + productoId).style.display = 'flex';
    document.getElementById("liCantProducto_" + productoId).style.alignSelf = 'center';
    document.getElementById("cantidadProducto_" + productoId).style.margin = 0;
    document.getElementById("cantidadProducto_" + productoId).innerHTML = cantidad;
}

// Funcion en donde agregamos el producto al carrito
function agregarItem(productoId){    
    // Buscamos por id de producto en el array de productos
    let producto = productos.find(f => f.id == productoId);    

    let cantidad = parseInt(document.getElementById("cantidadProducto_" + productoId).innerHTML);

    carrito.push(new Carrito(carritoId, producto, cantidad, cantidad * producto.precio));
    carritoId = carritoId + 1;

    document.getElementById("itemsCarrito").innerHTML = document.getElementById("itemsCarrito").innerHTML + "<div style='display:inline-flex; color:white; align-items: baseline;' id='itemCarrito_"+ producto.id +"'><p>"+ producto.nombre +" x<p style='padding-right:10px'>"+ cantidad +"</p></p><button class='btn btn-default' title='Eliminar' onclick='eliminarItem("+ producto.id +")'>X</button></div>"; 
    document.getElementById("total").innerHTML = (parseInt(document.getElementById("total").innerHTML) + producto.precio * cantidad);
}

function eliminarItem(productoId){


    document.getElementById("total").innerHTML = parseInt(document.getElementById("total").innerHTML) - (carrito.find(f => f.producto.id == productoId)).total;
    document.getElementById("itemCarrito_" + productoId).remove();
    let posicion = carrito.findIndex(f => f.producto.id == productoId);
    carrito.splice(posicion, 1);    
}

function vaciarCarrito(){
    carrito.splice(0, carrito.length);

    document.getElementById("itemsCarrito").innerHTML = "";
    document.getElementById("total").innerHTML = "0";
}