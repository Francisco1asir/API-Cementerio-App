/*****************************REVIEWS EN EL BACKEND*************************/

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('col');

    function cargarResenas() {
        fetch('http://localhost:3001/reviews')
            .then(response => response.json())
            .then(data => {
                console.log('Datos de reseñas obtenidos:', data);
                reviewsContainer.innerHTML = '';
                data.forEach(resena => {
                    const { id, nombre, estrellas, review, foto } = resena;

                    // Si no hay foto, usar imagen por defecto
                    const imagenSrc = foto ? foto : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

                    const resenaElement = document.createElement('div');
                    resenaElement.classList.add('testimonial');

                    // Crear el HTML para las estrellas y su condición
                    let estrellasHTML = '';
                    for (let i = 0; i < 5; i++) {
                        if (i < estrellas) {
                            estrellasHTML += '<i class="fas fa-star"></i>'; // llena
                        } else {
                            estrellasHTML += '<i class="far fa-star"></i>'; // vacía
                        }
                    }

                    // Insertar las estrellas en el elemento de la reseña
                    resenaElement.innerHTML = `
                        <img src="${imagenSrc}">
                        <h3>${nombre}</h3>
                        <div class="stars">${estrellasHTML}</div>
                        <p>${review}</p>
                        <button class="delete-btn" data-id="${id}"><i class="far fa-trash-alt"></i></button>
                    `;

                    // Agregar evento de clic al botón de borrar
                    const deleteButton = resenaElement.querySelector('.delete-btn');
                    deleteButton.addEventListener('click', () => {
                        borrarResena(id); // función para borrar la reseña
                    });

                    reviewsContainer.appendChild(resenaElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener las reseñas:', error);
            });
    }

    cargarResenas();

    // Función para borrar una reseña con confirmación
    function borrarResena(id) {
        // Mostrar un mensaje de confirmación
        const confirmacion = confirm("¿Estás seguro de que deseas borrar esta reseña?");

        // Si el usuario confirma, proceder con la eliminación
        if (confirmacion) {
            fetch(`http://localhost:3001/reviews/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    console.log(`Reseña con ID ${id} borrada exitosamente.`);
                    // Recargar las reseñas después de borrar
                    cargarResenas();
                } else {
                    console.error('Error al intentar borrar la reseña.');
                }
            })
            .catch(error => {
                console.error('Error al intentar borrar la reseña:', error);
            });
        } else {
            // Si el usuario cancela la confirmación, no hacer nada
            console.log("La eliminación de la reseña fue cancelada.");
        }
    }
});

/************ INSERTAR DATOS (POST) ***************/
document.addEventListener("DOMContentLoaded", () => {
    const formularioAtaud = document.getElementById('formulario-ataud');

    formularioAtaud.addEventListener('submit', event => {
        event.preventDefault();

        const nuevoAtaud = {
            nombre: formularioAtaud.nombre.value,
            categoria: formularioAtaud.categoria.value,
            precio: formularioAtaud.precio.value,
            material: formularioAtaud.material.value,
            imagen: formularioAtaud.imagen.value
        };

        fetch('http://localhost:3001/ataudes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAtaud)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Nuevo ataúd insertado:', data);
                // Recargar la pagina despues de la insercion
                window.location.reload();
            })
            .catch(error => {
                console.error('Error al insertar el nuevo ataúd:', error);
            });
    });
});
