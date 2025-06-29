const swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.next-arrow',
    prevEl: '.prev-arrow',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  spaceBetween: 0 // KEIN Abstand nötig, sonst sieht man evtl. Teile der nächsten Slides
});

// Zoom-Funktion für Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');

document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});


  const form = document.querySelector("form");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function () {
  // Button deaktivieren
  submitButton.disabled = true;
  submitButton.innerText = "Nachricht wird gesendet...";

  // Optional: CSS ändern um Wiederklick zu vermeiden
  submitButton.style.opacity = "0.6";
  submitButton.style.cursor = "not-allowed";
});

