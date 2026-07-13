/* Cambia entre español e inglés y abre/cierra el menú móvil */

// --- Idioma ---
function cambiarIdioma() {
  document.body.classList.toggle('ver-en');
  var enIngles = document.body.classList.contains('ver-en');
  // actualizar el texto del botón
  document.querySelectorAll('.idioma').forEach(function (b) {
    b.textContent = enIngles ? 'Español' : 'English';
  });
  // recordar la preferencia
  try { localStorage.setItem('idioma', enIngles ? 'en' : 'es'); } catch (e) {}
}

// --- Menú móvil ---
function alternarMenu() {
  document.querySelector('.menu').classList.toggle('abierto');
}

// Al cargar, aplicar idioma guardado
(function () {
  try {
    if (localStorage.getItem('idioma') === 'en') {
      document.body.classList.add('ver-en');
      document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.idioma').forEach(function (b) { b.textContent = 'Español'; });
      });
    }
  } catch (e) {}
})();
