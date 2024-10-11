// scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
    const busquedaInput = document.getElementById('busqueda');
    const sugerencias = document.querySelector('.sugerencias');
    const secciones = document.querySelectorAll('main > section');
    const proyectos = document.querySelectorAll('.proyecto');
    const detalleProyecto = document.querySelector('.detalle-proyecto');
    const botonesVolver = document.querySelectorAll('.boton-volver');

    // Mostrar sugerencias al enfocar la barra de búsqueda
    busquedaInput.addEventListener('focus', () => {
        sugerencias.style.display = 'block';
    });

    // Ocultar sugerencias al perder el foco
    busquedaInput.addEventListener('blur', () => {
        setTimeout(() => {
            sugerencias.style.display = 'none';
        }, 200);
    });

    // Navegar a la sección seleccionada
    sugerencias.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const seccionId = e.target.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        }
    });

    // Mostrar sección
    function mostrarSeccion(id) {
        secciones.forEach(seccion => {
            seccion.classList.remove('seccion-activa');
            seccion.classList.add('seccion-oculta');
        });
        const seccionActiva = document.getElementById(id);
        seccionActiva.classList.remove('seccion-oculta');
        seccionActiva.classList.add('seccion-activa');
    }

    // Mostrar detalle de proyecto
    proyectos.forEach(proyecto => {
        proyecto.addEventListener('click', () => {
            const id = proyecto.getAttribute('data-proyecto');
            // Aquí deberías cargar los datos reales del proyecto
            const datos = {
                titulo: proyecto.querySelector('h3').textContent,
                descripcion: proyecto.querySelector('p').textContent,
                fecha: '01/01/2023',
                cliente: 'Cliente Ejemplo',
                imagen: 'https://via.placeholder.com/400x300'
            };
            mostrarDetalleProyecto(datos);
        });
    });

    function mostrarDetalleProyecto(datos) {
        document.getElementById('titulo-proyecto').textContent = datos.titulo;
        document.getElementById('descripcion-proyecto').textContent = datos.descripcion;
        document.getElementById('fecha-proyecto').textContent = `Fecha: ${datos.fecha}`;
        document.getElementById('cliente-proyecto').textContent = `Cliente: ${datos.cliente}`;
        document.getElementById('img-proyecto').src = datos.imagen;
        detalleProyecto.style.display = 'block';
    }

    // Manejar el botón de volver
    botonesVolver.forEach(boton => {
        boton.addEventListener('click', () => {
            mostrarSeccion('inicio');
        });
    });

    // Inicializar Three.js para los iconos 3D
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('lenguajes-container').appendChild(renderer.domElement);

    // Crear iconos 3D
    const iconosInfo = [
        { color: 0xFF6B6B, position: [-1, 1, 0] },
        { color: 0x4ECDC4, position: [1, 1, 0] },
        { color: 0xFFD93D, position: [-1, -1, 0] },
        { color: 0x45B7D1, position: [1, -1, 0] },
    ];

    const iconos = iconosInfo.map(info => {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: info.color });
        const icono = new THREE.Mesh(geometry, material);
        icono.position.set(...info.position);
        scene.add(icono);
        return icono;
    });

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        iconos.forEach(icono => {
            icono.rotation.x += 0.01;
            icono.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

    // Ajustar tamaño del renderizador cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});