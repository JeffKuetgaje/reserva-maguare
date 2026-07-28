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

// --- Lightbox / galería de fotos por habitación ---
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var caja = document.getElementById('lightbox');
    var galerias = window.GALERIAS;
    if (!caja || !galerias) return;

    var img = caja.querySelector('.lb-img');
    var contador = caja.querySelector('.lb-contador');
    var btnPrev = caja.querySelector('.lb-prev');
    var btnSig = caja.querySelector('.lb-sig');
    var btnCerrar = caja.querySelector('.lb-cerrar');
    var lista = [];
    var indice = 0;

    function mostrar() {
      if (!lista.length) return;
      img.src = lista[indice];
      contador.textContent = (indice + 1) + ' / ' + lista.length;
      var solaUna = lista.length < 2;
      btnPrev.style.display = solaUna ? 'none' : '';
      btnSig.style.display = solaUna ? 'none' : '';
    }
    function abrir(clave, inicio) {
      lista = galerias[clave] || [];
      if (!lista.length) return;
      indice = inicio || 0;
      caja.classList.add('abierto');
      document.body.style.overflow = 'hidden';
      mostrar();
      btnCerrar.focus();
    }
    function cerrar() {
      caja.classList.remove('abierto');
      document.body.style.overflow = '';
      img.src = '';
    }
    function siguiente() { indice = (indice + 1) % lista.length; mostrar(); }
    function anterior() { indice = (indice - 1 + lista.length) % lista.length; mostrar(); }

    document.querySelectorAll('[data-galeria]').forEach(function (btn) {
      btn.addEventListener('click', function () { abrir(btn.getAttribute('data-galeria'), 0); });
    });
    btnSig.addEventListener('click', siguiente);
    btnPrev.addEventListener('click', anterior);
    btnCerrar.addEventListener('click', cerrar);
    caja.addEventListener('click', function (e) { if (e.target === caja) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (!caja.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrar();
      else if (e.key === 'ArrowRight') siguiente();
      else if (e.key === 'ArrowLeft') anterior();
    });
  });
})();
