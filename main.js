// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM (las piezas del index.html)
    const form = document.getElementById('formulario-pharus');
    const pantallaCarga = document.getElementById('pantalla-carga');
    const pantallaResultado = document.getElementById('pantalla-resultado');
    const logo = document.getElementById('logo-principal');
    const btnEnviar = document.getElementById('btn-enviar');
    const tokenDisplay = document.getElementById('token-display');

    // 1. Inicialización: Cargar el token desde la config
    tokenDisplay.textContent = PHARUS_CONFIG.token;

    // 2. Validación silenciosa por Caché
    // Revisa si el explorador ya tiene la marca de "aprobado"
    if (localStorage.getItem('pharus-aprobado') === 'true') {
        form.classList.add('oculto');
        pantallaResultado.classList.remove('oculto');
    }

    // 3. Procesamiento del Formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Detiene la recarga de la página

        form.classList.add('oculto');
        pantallaCarga.classList.remove('oculto');

        // Simula la conexión a la base de datos de la "Tierra"
        setTimeout(() => {
            pantallaCarga.classList.add('oculto');
            pantallaResultado.classList.remove('oculto');
            
            // Escribe en la caché para futuras visitas
            localStorage.setItem('pharus-aprobado', 'true');
        }, PHARUS_CONFIG.tiempoCargaMS);
    });

    // 4. Mecánica Transmedia (Easter Egg)
    let clics = 0;
    
    logo.addEventListener('click', () => {
        clics++;
        
        if (clics === PHARUS_CONFIG.clicsParaCorrupcion) {
            // Activa el CSS rojo
            document.body.classList.add('corrupted');
            
            // Reemplaza los textos llamando a la config
            logo.textContent = PHARUS_CONFIG.textos.easterEggLogo;
            btnEnviar.textContent = PHARUS_CONFIG.textos.easterEggBoton;
            
            // Borra la caché para que el usuario atrapado vuelva a ver el formulario rojo si recarga
            localStorage.removeItem('pharus-aprobado');
        }
    });
});