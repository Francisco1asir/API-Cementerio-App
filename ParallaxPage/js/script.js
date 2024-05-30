let text = document.getElementById('text');
let treeLeft = document.getElementById('tree-left');
let treeRight = document.getElementById('tree-right');
let gateLeft = document.getElementById('gate-left');
let gateRight = document.getElementById('gate-right');

function formatNumberWithPoints(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    text.style.marginTop = value * 1.5 + 'px';
    treeLeft.style.left = value * -1.5 + 'px';
    treeRight.style.left = value * 0.5 + 'px';
    gateLeft.style.left = value * 0.5 + 'px';
    gateRight.style.left = value * -0.5 + 'px';
});

document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.fade-in');

    function checkFadeIn() {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
});


var activeCoffin = 1;
var totalCoffins = document.getElementsByClassName('coffin').length;

function showCoffin(index) {
    document.getElementById('coffin' + activeCoffin).classList.remove('active');
    document.getElementById('coffin' + index).classList.add('active');
    activeCoffin = index;
}


function showCoffin(index) {
    // Remover la clase 'active' de todos los thumbnails
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function (thumbnail) {
        thumbnail.classList.remove('active');
    });

    // Agregar la clase 'active' al thumbnail seleccionado
    document.getElementById('thumbnail' + index).classList.add('active');

    // Remover la clase 'active' de todos 
    var coffins = document.querySelectorAll('.coffin');
    coffins.forEach(function (coffin) {
        coffin.classList.remove('active');
    });

    // Agregar la clase 'active' al ataud selecciondo
    document.getElementById('coffin' + index).classList.add('active');
}


/**********POKE API***********/
// document.addEventListener("DOMContentLoaded", function () {
//     fetch("https://pokeapi.co/api/v2/pokemon/")
//         .then(response => response.json())
//         .then(data => {
//             const pokemonContainer = document.getElementById("pokemon-container");
//             data.results.forEach(pokemon => {
//                 fetch(pokemon.url)
//                     .then(response => response.json())
//                     .then(pokemonData => {
//                         const card = document.createElement("div");
//                         card.classList.add("card2");

//                         const name = document.createElement("h3");
//                         name.textContent = pokemonData.name;

//                         const image = document.createElement("img");
//                         image.src = pokemonData.sprites.front_default;
//                         image.alt = pokemonData.name;

//                         card.addEventListener("click", function () {i
//                             window.location.href = "detalle_pokemon.html?name=" + pokemonData.name;
//                         });

//                         card.appendChild(name);
//                         card.appendChild(image);

//                         pokemonContainer.appendChild(card);
//                     })
//                     .catch(error => {
//                         console.error("Hubo un error al obtener los datos del Pokémon:", error);
//                     });
//             });
//         })
//         .catch(error => {
//             console.error("Hubo un error al obtener los datos:", error);
//         });
// });


/************** JSON SERVER ******************/
document.addEventListener("DOMContentLoaded", () => {
    const ataudesContainer = document.getElementById('coffin-list');

    // Función para cargar y mostrar los ataúdes
    function cargarAtaudes() {
        fetch('http://localhost:3001/ataudes')
            .then(response => response.json())
            .then(data => {
                // Limpiar el contenedor antes de agregar nuevos ataúdes
                ataudesContainer.innerHTML = '';

                // Iterar sobre los ataúdes y crear elementos HTML para mostrarlos
                data.forEach(ataud => {
                    const { id, nombre, categoria, precio, imagen, material } = ataud;

                    // Crear un div para mostrar los detalles del ataúd
                    const ataudElement = document.createElement('div');
                    ataudElement.classList.add('ataud');
                    ataudElement.innerHTML = `
              <img src=${imagen}>
              <h3>${nombre}</h3>
              <p>Cat: ${categoria}</p>
              <p>${formatNumberWithPoints(precio)}€</p>
              <a class="btn" href="detalle_ataud.html?id=${id}">Ver detalles</a>
            `;

                    // Agregar el elemento del ataud al contenedor
                    ataudesContainer.appendChild(ataudElement);
                });

                // Agregar manejador de eventos para los botones de eliminar
                const botonesEliminar = document.querySelectorAll('.eliminar-ataud');
                botonesEliminar.forEach(boton => {
                    boton.addEventListener('click', () => {
                        const idAtaud = boton.getAttribute('data-id');
                        confirmarEliminar(idAtaud);
                    });
                });
            })
            .catch(error => {
                console.error('Error al obtener los ataúdes:', error);
            });
    }

    // confirmar la eliminación del ataúd
    function confirmarEliminar(idAtaud) {
        if (confirm("¿Estás seguro de que quieres eliminar este ataúd?")) {
            eliminarAtaud(idAtaud);
        }
    }

    // eliminar un ataúd
    function eliminarAtaud(idAtaud) {
        fetch(`http://localhost:3001/ataudes/${idAtaud}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Ataúd eliminado:', data);
                // Volver a cargar los ataúdes después de eliminar uno
                cargarAtaudes();
            })
            .catch(error => {
                console.error('Error al eliminar el ataúd:', error);
            });
    }

    // Cargar y mostrar los ataudes al cargar la página
    cargarAtaudes();
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

/***************REVIEWS***************/
const ataudesContainer = document.getElementById('col');

// cargar y mostrar las reseñas
document.addEventListener("DOMContentLoaded", () => {
    const ataudesContainer = document.getElementById('col');

    // cargar y mostrar los ataúdes
    function cargarAtaudes() {
        fetch('http://localhost:3001/reviews')
            .then(response => response.json())
            .then(data => {
                ataudesContainer.innerHTML = '';
                data.forEach(ataud => {
                    const { nombre, estrellas, review, foto } = ataud;

                    // Si no hay foto, usar imagen por defecto
                    const imagenSrc = foto ? foto : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

                    const ataudElement = document.createElement('div');
                    ataudElement.classList.add('testimonial');
                    // Crear el HTML para las estrellas y su condicion
                    let estrellasHTML = '';
                    for (let i = 0; i < 5; i++) {
                        if (i < estrellas) {
                            estrellasHTML += '<i class="fas fa-star"></i>'; // llena
                        } else {
                            estrellasHTML += '<i class="far fa-star"></i>'; // vacia
                        }
                    }
                    // Insertar las estrellas en el elemento del ataúd
                    ataudElement.innerHTML = `
        <img src="${imagenSrc}">
        <h3>${nombre}</h3>
        <div class="stars">${estrellasHTML}</div>
        <p>${review}</p>
      `;

                    ataudesContainer.appendChild(ataudElement);
                });

            })
            .catch(error => {
                console.error('Error al obtener los ataúdes:', error);
            });
    }
    cargarAtaudes();
});


/************Formulario reseñas************/
const formularioReseña = document.getElementById('formulario-reseña');

formularioReseña.addEventListener('submit', event => {
    event.preventDefault();

    const nuevaReseña = { 
        nombre: formularioReseña.nombre.value,
        estrellas: parseInt(formularioReseña.estrellas.value),
        review: formularioReseña.review.value
    };

    fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaReseña)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Nueva reseña insertada:', data);
            // Recargar la pagina después de la insercion
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al insertar la nueva reseña:', error);
        });
});

// Texto de cargando para los model-viewers
document.querySelectorAll('model-viewer').forEach((modelViewer, index) => {
    const loadingMessage = document.getElementById(`loading-message${index + 1}`);
1
    modelViewer.addEventListener('load', () => {
        loadingMessage.style.display = 'none';
    });

    modelViewer.addEventListener('error', () => {
        loadingMessage.textContent = 'Error al cargar el modelo';
    });
});

const audio = document.getElementById('audio');
const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const playIcon = '<i class="fas fa-play"></i>';
const pauseIcon = '<i class="fas fa-pause"></i>';

// Play/Pause toggle
playPauseBtn.addEventListener('click', function () {
  if (audio.paused && video.paused) {
    audio.play();
    video.play();
    playPauseBtn.innerHTML = pauseIcon;
  } else {
    audio.pause();
    video.pause();
    playPauseBtn.innerHTML = playIcon;
  }
});

// Update progress bar
audio.addEventListener('timeupdate', function () {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient(to right, #007bff ${progress}%, #ddd ${progress}%)`;
});

video.addEventListener('timeupdate', function () {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient(to right, #007bff ${progress}%, #ddd ${progress}%)`;
});

// Seek functionality
progressBar.addEventListener('input', function () {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
  video.currentTime = seekTime;
  progressBar.style.background = `linear-gradient(to right, #007bff ${progressBar.value}%, #ddd ${progressBar.value}%)`;
});

const playPauseBtns = document.querySelectorAll('.playPauseBtn');
const audios = document.querySelectorAll('.audio');

playPauseBtns.forEach((btn, index) => {
    const audio = audios[index];
    
    btn.addEventListener('click', function () {
        if (audio.paused) {
            audios.forEach((a, i) => {9
                if (i !== index) {
                    a.pause();
                    playPauseBtns[i].innerHTML = playIcon;
                }
            });
            audio.play();
            btn.innerHTML = pauseIcon;
        } else {
            audio.pause();
            btn.innerHTML = playIcon;
        }
    });

    audio.addEventListener('ended', function () {
        btn.innerHTML = playIcon;
    });
});


