const formulario = document.getElementById('form-contacto');
const mensajeExito = document.getElementById('mensaje-exito');
const botonEnviar = document.getElementById('btn-texto');

formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que la página se recargue o redirija

    // Damos feedback visual de carga
    botonEnviar.textContent = "Enviando...";
    botonEnviar.disabled = true;

    const formData = new FormData(formulario);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Enviamos los datos a Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let res = await response.json();

            if (response.status == 200) {
                // 1. Vaciamos las casillas del formulario
                formulario.reset();

                // 2. Mostramos el mensaje visual de éxito
                mensajeExito.style.display = "block";

                // 3. Restauramos el botón inmediatamente al terminar con éxito
                botonEnviar.textContent = "Enviar Mensaje";
                botonEnviar.disabled = false;

                // Ocultamos el mensaje de éxito después de 5 segundos
                setTimeout(() => {
                    mensajeExito.style.display = "none";
                }, 5000);

            } else {
                console.log(res);
                alert("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
                // Restauramos el botón en caso de error de la API
                botonEnviar.textContent = "Enviar Mensaje";
                botonEnviar.disabled = false;
            }
        })
        .catch(error => {
            console.log(error);
            alert("Error de conexión. No se pudo enviar el formulario.");
            // Restauramos el botón en caso de error de red
            botonEnviar.textContent = "Enviar Mensaje";
            botonEnviar.disabled = false;
        });
});

// Carrusel Automático de Proyectos
function iniciarCarrusel() {
    const imagenes = document.querySelectorAll('.proyecto-preview-box .slide-img');
    if (imagenes.length === 0) return; // Seguridad por si no encuentra imágenes

    let indiceActual = 0;

    setInterval(() => {
        // Quita la clase activa a la imagen que se está mostrando actualmente
        imagenes[indiceActual].classList.remove('active');

        // Pasa a la siguiente imagen (vuelve a 0 si llega al final)
        indiceActual = (indiceActual + 1) % imagenes.length;

        // Muestra la nueva imagen aplicando la clase activa
        imagenes[indiceActual].classList.add('active');
    }, 4000); // 4000 milisegundos = 4 segundos
}

// Ejecutar la función una vez cargada la página
document.addEventListener('DOMContentLoaded', iniciarCarrusel);