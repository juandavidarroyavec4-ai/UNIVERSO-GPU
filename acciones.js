/* ==========================================================================
   LÓGICA JAVASCRIPT Y MANIPULACIÓN DINÁMICA DEL DOM
   ========================================================================== */
   // =======================================================
// CONTROL DE ACCESO (PROTECCIÓN DE PÁGINAS)
// =======================================================

// Verifica si el usuario ha iniciado sesión antes de mostrar el catálogo
document.addEventListener('DOMContentLoaded', () => {
    // Si NO está en la página de login y NO se ha autenticado, lo manda a login.html
    const estaEnLogin = window.location.pathname.includes('login.html');
    const usuarioLogueado = localStorage.getItem('sesionIniciada');

    if (!estaEnLogin && !usuarioLogueado) {
        window.location.href = "login.html";
    }
});

// =======================================================
// BLOQUE 1: BASE DE DATOS LOCAL DE LAS TARJETAS GRÁFICAS
// (Contiene la información de cada recuadro: precios, uso y VRAM)
// =======================================================

const tarjetasGpu = [
    // --- TARJETAS MARCA NVIDIA ---
    {
        nombre: "NVIDIA GeForce RTX 4090",
        marca: "NVIDIA",
        vram: "24 GB GDDR6X",
        uso: "Gaming 4K Ultra, Render 3D masivo, Modelos IA",
        rendimiento: "Gama Entusiasta / Top 1 Mundial",
        precio: "$8.500.000 COP",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6i3VbMlxO-4cB-plsZGBYKHMoTmVVoEER91vFSLYqY69XSI3eVB9i0U4&s=10"
    },
    {
        nombre: "NVIDIA GeForce RTX 4080 Super",
        marca: "NVIDIA",
        vram: "16 GB GDDR6X",
        uso: "Gaming 4K fluido, Ray Tracing exigente, Edición 8K",
        rendimiento: "Gama Alta Profesional",
        precio: "$5.200.000 COP",
        imagen: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080/geforce-rtx-4080-super-og-1200x630.jpg"
    },
    {
        nombre: "NVIDIA GeForce RTX 4070 Ti Super",
        marca: "NVIDIA",
        vram: "16 GB GDDR6X",
        uso: "Gaming 1440p / 4K Competitivo, Streaming",
        rendimiento: "Gama Media-Alta",
        precio: "$4.100.000 COP",
        imagen: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/40-series/rtx-4070-4070ti/geforce-rtx-4070-super-og-1200x630.jpg"
    },
    {
        nombre: "NVIDIA GeForce RTX 4060 Ti",
        marca: "NVIDIA",
        vram: "8 GB / 16 GB GDDR6",
        uso: "Gaming 1080p Ultra, DLSS 3 Frame Generation",
        rendimiento: "Gama Media Estándar",
        precio: "$2.300.000 COP",
        imagen: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4060-4060ti/geforce-rtx-4060-ti-og-1200x630.jpg"
    },

    // --- TARJETAS MARCA AMD RADEON ---
    {
        nombre: "AMD Radeon RX 7900 XTX",
        marca: "AMD",
        vram: "24 GB GDDR6",
        uso: "Gaming 4K Puro, Máximo ancho de banda VRAM",
        rendimiento: "Gama Entusiasta AMD",
        precio: "$5.800.000 COP",
        imagen: "https://d1q3zw97enxzq2.cloudfront.net/images/7900gre.width-1000.format-webp.webp"
    },
    {
        nombre: "AMD Radeon RX 7800 XT",
        marca: "AMD",
        vram: "16 GB GDDR6",
        uso: "Rey de la resolución 1440p Calidad / Precio",
        rendimiento: "Gama Media-Alta",
        precio: "$2.800.000 COP",
        imagen: "https://www.gigabyte.com/FileUpload/Global/KeyFeature/3569/innergigabyte/images/amd/sl1.jpg"
    },
    {
        nombre: "AMD Radeon RX 7700 XT",
        marca: "AMD",
        vram: "12 GB GDDR6",
        uso: "Gaming 1440p Competitivo, Edición de video",
        rendimiento: "Gama Media",
        precio: "$2.200.000 COP",
        imagen: "https://www.muycomputer.com/wp-content/uploads/2023/06/Radeon-RX-7700-XT.jpg"
    },
    {
        nombre: "AMD Radeon RX 6600",
        marca: "AMD",
        vram: "8 GB GDDR6",
        uso: "La mejor tarjeta de entrada para 1080p Económico",
        rendimiento: "Gama Entrada Gamer",
        precio: "$1.100.000 COP",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFodvZwI01JGmIzXTJZtWrx9wCDEaKUaPuLpXDkEAEtwMHKqLltpuAoCgV&s=10"
    },

    // --- TARJETAS MARCA INTEL ARC ---
    {
        nombre: "Intel Arc A770",
        marca: "Intel",
        vram: "16 GB GDDR6",
        uso: "Edición AV1 profesional, Gaming 1080p/1440p",
        rendimiento: "Gama Media Calidad / VRAM",
        precio: "$1.600.000 COP",
        imagen: "https://i0.wp.com/www.madboxpc.com/wp-content/uploads/2022/09/Featured-Image-Intel-Arc.jpg?fit=1200%2C675&ssl=1"
    },
    {
        nombre: "Intel Arc A750",
        marca: "Intel",
        vram: "8 GB GDDR6",
        uso: "Gaming 1080p fluido, Creación de contenido",
        rendimiento: "Gama Entrada Económica",
        precio: "$1.200.000 COP",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ19Xt3Z8m8vc4ENQk3G9V5zy-BofF7nwEh-yK7adDRFYH4Mzai06FyCN0q&s=10"
    },
    {
        nombre: "Intel Arc A580",
        marca: "Intel",
        vram: "8 GB GDDR6",
        uso: "Juegos Esports, PC multimedia y trabajo básico",
        rendimiento: "Gama de Entrada",
        precio: "$950.000 COP",
        imagen: "https://cdn.videocardz.com/1/2023/09/INTEL-ARC-A580.jpg"
    }
];


// =======================================================
// BLOQUE 2: FUNCIÓN PARA CREAR LOS RECUADROS EN EL HTML
// (Toma la información y genera el HTML de las tarjetas)
// =======================================================
function renderizarTarjetas(lista) {
    // Ubica la sección del HTML donde se van a insertar las tarjetas
    const contenedor = document.getElementById('gpuContainer');
    if (!contenedor) return;

    // Limpia el contenido previo del recuadro
    contenedor.innerHTML = '';

    // Si no se encuentran resultados al buscar
    if (lista.length === 0) {
        contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se encontraron tarjetas que coincidan con la búsqueda.</p>';
        return;
    }

    // Genera el código HTML individual de cada recuadro (card)
    lista.forEach(gpu => {
        const card = document.createElement('div');
        card.className = 'gpu-card'; // Le asigna la clase CSS para dar estilos de recuadro
        
        card.innerHTML = `
            <div>
                <span class="badge badge-${gpu.marca}">${gpu.marca}</span>
                <img src="${gpu.imagen}" alt="${gpu.nombre}">
                <h3>${gpu.nombre}</h3>
                <p><strong>VRAM:</strong> ${gpu.vram}</p>
                <p><strong>Rendimiento:</strong> ${gpu.rendimiento}</p>
                <p><strong>Uso ideal:</strong> ${gpu.uso}</p>
            </div>
            <p class="gpu-price">${gpu.precio}</p>
        `;
        contenedor.appendChild(card);
    });
}


// =======================================================
// BLOQUE 3: FUNCIÓN DEL BUSCADOR EN TIEMPO REAL
// (Filtra la lista según lo que el usuario escribe)
// =======================================================
function filtrarPorMarca(marca) {
    const busqueda = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    // Filtra el arreglo según la marca y el texto escrito en el buscador
    const resultado = tarjetasGpu.filter(gpu => {
        const coincideMarca = gpu.marca === marca;
        const coincideBusqueda = gpu.nombre.toLowerCase().includes(busqueda) || 
                                 gpu.uso.toLowerCase().includes(busqueda) ||
                                 gpu.vram.toLowerCase().includes(busqueda);
        return coincideMarca && coincideBusqueda;
    });

    // Vuelve a renderizar los recuadros filtrados
    renderizarTarjetas(resultado);
}


// =======================================================
// BLOQUE 4: LÓGICA DE LA CALCULADORA DE PRESUPUESTO
// (Procesa los datos introducidos en el formulario)
// =======================================================
function procesarFormulario(e) {
    e.preventDefault(); // Evita que la página se recargue al presionar enviar

    const nombre = document.getElementById('nombre').value;
    const presupuesto = Number(document.getElementById('presupuesto').value);
    const mensaje = document.getElementById('mensajeResultado');

    let recomendacion = "";

    // Lógica condicional de selección según presupuesto
    if (presupuesto < 1500000) {
        recomendacion = "Gama de Entrada: Te conviene una <strong>AMD RX 6600</strong> o una <strong>Intel Arc A750</strong>.";
    } else if (presupuesto >= 1500000 && presupuesto < 3500000) {
        recomendacion = "Gama Media: Te recomendamos una <strong>AMD RX 7800 XT</strong> o una <strong>NVIDIA RTX 4060 Ti / 4070</strong>.";
    } else {
        recomendacion = "Gama Alta / Entusiasta: Apunta a una <strong>NVIDIA RTX 4080 Super / 4090</strong> o <strong>AMD RX 7900 XTX</strong>.";
    }

    // Muestra el recuadro con el resultado
    mensaje.style.display = 'block';
    mensaje.innerHTML = `¡Hola ${nombre}! Con un presupuesto de $${presupuesto.toLocaleString('es-CO')} COP, tu opción ideal es de ${recomendacion}`;
}


// =======================================================
// BLOQUE 5: DETECCION AUTOMÁTICA DE LA PÁGINA ACTUAL
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    // Lee la etiqueta 'data-marca' del body para saber en qué página estamos
    const marcaPagina = document.body.getAttribute('data-marca');
    if (marcaPagina) {
        filtrarPorMarca(marcaPagina);
    }
});

// =======================================================
// BLOQUE 6: LÓGICA DE VALIDACIÓN DE INICIO DE SESIÓN
// =======================================================
function validarLogin(e) {
    e.preventDefault();
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('mensajeError');

    const passGuardada = localStorage.getItem(user);

    if ((user === "admin" && pass === "1234") || (passGuardada && passGuardada === pass)) {
        // Marcamos que el usuario ya inició sesión
        localStorage.setItem('sesionIniciada', 'true');
        // Redirigimos al catálogo
        window.location.href = "index.html";
    } else {
        msg.style.display = 'block';
        msg.style.color = '#f85149';
        msg.style.borderColor = '#f85149';
        msg.style.backgroundColor = '#f8514922';
        msg.innerText = "❌ Usuario o contraseña incorrectos.";
    }
}

// =======================================================
// LÓGICA DE LOGIN Y REGISTRO
// =======================================================

// Cambiar la vista a Registro
function mostrarRegistro(e) {
    e.preventDefault();
    document.getElementById('formLogin').style.display = 'none';
    document.getElementById('formRegistro').style.display = 'block';
    document.getElementById('tituloForm').innerText = "Crear Cuenta 📝";
    document.getElementById('subtituloForm').innerText = "Regístrate para guardar tu perfil";
    document.getElementById('mensajeError').style.display = 'none';
    document.getElementById('textoSwitch').innerHTML = `¿Ya tienes cuenta? <a href="#" onclick="mostrarLogin(event)">Inicia sesión aquí</a>`;
}

// Cambiar la vista a Login
function mostrarLogin(e) {
    e.preventDefault();
    document.getElementById('formLogin').style.display = 'block';
    document.getElementById('formRegistro').style.display = 'none';
    document.getElementById('tituloForm').innerText = "Iniciar Sesión 🚀";
    document.getElementById('subtituloForm').innerText = "Ingresa tus credenciales para continuar";
    document.getElementById('mensajeError').style.display = 'none';
    document.getElementById('textoSwitch').innerHTML = `¿No tienes cuenta? <a href="#" onclick="mostrarRegistro(event)">Regístrate aquí</a>`;
}

// Guardar nuevo usuario en el navegador
function registrarUsuario(e) {
    e.preventDefault();
    const user = document.getElementById('nuevoUsuario').value;
    const pass = document.getElementById('nuevaPassword').value;
    const msg = document.getElementById('mensajeError');

    // Guardamos en el almacenamiento local del navegador
    localStorage.setItem(user, pass);

    msg.style.display = 'block';
    msg.style.color = '#3fb950';
    msg.style.borderColor = '#3fb950';
    msg.style.backgroundColor = '#3fb95022';
    msg.innerText = "¡Cuenta creada con éxito! Ahora inicia sesión.";

    setTimeout(() => {
        mostrarLogin(e);
    }, 1500);
}

// Validar credenciales al entrar
function validarLogin(e) {
    e.preventDefault();
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('mensajeError');

    // Busca la contraseña guardada del usuario ingresado
    const passGuardada = localStorage.getItem(user);

    // Cuenta admin por defecto O usuario registrado previamente
    if ((user === "admin" && pass === "1234") || (passGuardada && passGuardada === pass)) {
        window.location.href = "index.html"; // Redirige al catálogo
    } else {
        msg.style.display = 'block';
        msg.style.color = '#f85149';
        msg.style.borderColor = '#f85149';
        msg.style.backgroundColor = '#f8514922';
        msg.innerText = "❌ Usuario o contraseña incorrectos.";
    }
}