let tituloOriginal = 'API Cementerio'; // Título original
window.onblur = function(){ // Si el usuario se va a otro lado...
  document.title = "Oye, vuelve aqui 😢 ";// Cambiamos el título
}

window.onfocus = function(){
  document.title = tituloOriginal; // Si el usuario vuelve restablecemos el título
}

