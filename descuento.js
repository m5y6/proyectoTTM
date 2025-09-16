// Base de datos de productos con descuentos para la página principal
const productosConDescuentos = [
    {
        id: 1,
        nombre: "Batería Premium 12V",
        descripcion: "Batería de alta duración para camiones pesados",
        precio: 100000,
        precioAnterior: 133000,
        descuento: "25% OFF",
        categoria: "electrico",
        imagen: "img/bateria.png",
        badge: "descuento"
    },
    {
        id: 2,
        nombre: "Amortiguador Scania",
        descripcion: "Amortiguador trasero para Serie R y G",
        precio: 185000,
        precioAnterior: null,
        descuento: null,
        categoria: "suspension",
        imagen: "img/amortiguador.png",
        badge: "destacado"
    },
    {
        id: 3,
        nombre: "Filtro de Aceite Volvo",
        descripcion: "Filtro original para motores D12 y D13",
        precio: 45000,
        precioAnterior: 65000,
        descuento: "30% OFF",
        categoria: "filtros",
        imagen: "img/filtro2.png",
        badge: "descuento"
    },
    {
        id: 4,
        nombre: "Pastillas de Freno Meritor",
        descripcion: "Alta calidad para ejes Meritor",
        precio: 125000,
        precioAnterior: 150000,
        descuento: "OFERTA",
        categoria: "frenos",
        imagen: "img/pastilla.png",
        badge: "oferta"
    },
    {
        id: 5,
        nombre: "Neumático Bridgestone",
        descripcion: "295/80R22.5 - Excelente durabilidad",
        precio: 450000,
        precioAnterior: 560000,
        descuento: "20% OFF",
        categoria: "neumaticos",
        imagen: "img/neumatico2.png",
        badge: "descuento"
    },
    {
        id: 6,
        nombre: "Bomba de Agua Detroit",
        descripcion: "Para motores Detroit Diesel Serie 60",
        precio: 320000,
        precioAnterior: null,
        descuento: null,
        categoria: "motor",
        imagen: "img/bombaagua.jpg",
        badge: "nuevo"
    }
];

// Formatear precio
function formatearPrecio(precio) {
    return '$' + precio.toLocaleString('es-CL');
}

// Generar badge según el tipo
function generarBadge(badge, descuento) {
    if (!badge) return '';
    
    let texto = '';
    let clase = '';
    
    switch(badge) {
        case 'descuento':
            texto = descuento;
            clase = 'descuento';
            break;
        case 'destacado':
            texto = 'MÁS VENDIDO';
            clase = 'destacado';
            break;
        case 'oferta':
            texto = 'OFERTA';
            clase = 'oferta';
            break;
        case 'nuevo':
            texto = 'NUEVO';
            clase = 'nuevo';
            break;
        default:
            return '';
    }
    
    return `<div class="producto-badge ${clase}">${texto}</div>`;
}

// Generar HTML del contenedor de precios
function generarPrecioContainer(precio, precioAnterior) {
    if (precioAnterior) {
        return `
            <div class="precio-container">
                <span class="precio-anterior">${formatearPrecio(precioAnterior)}</span>
                <span class="precio">${formatearPrecio(precio)}</span>
            </div>
        `;
    } else {
        return `
            <div class="precio-container">
                <span class="precio">${formatearPrecio(precio)}</span>
            </div>
        `;
    }
}

// Mostrar productos con descuentos
function mostrarProductosConDescuentos() {
    const contenedorProductos = document.querySelector('.productos');
    
    if (!contenedorProductos) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    // Generar HTML de productos
    contenedorProductos.innerHTML = productosConDescuentos.map(producto => `
        <div class="producto">
            ${generarBadge(producto.badge, producto.descuento)}
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='img/placeholder.jpg'">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            ${generarPrecioContainer(producto.precio, producto.precioAnterior)}
        </div>
    `).join('');
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarProductosConDescuentos();
});