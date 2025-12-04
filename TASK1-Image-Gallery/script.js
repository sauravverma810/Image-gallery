// ================= HERO SLIDER (AUTO + MANUAL) ==================

let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

let index = 0;

// Show slide function
function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");

    index = i; // update index
}

// Auto slide
function autoSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

let slideInterval = setInterval(autoSlide, 4000);

// Dot click → manual slide
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        showSlide(i);

        // reset auto-slide after manual click
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 4000);
    });
});



// ================= LIGHTBOX CODE ==================

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnClose = document.getElementById("close");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");

let currentIndex = 0;

// Click image → open lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openLightbox(img.src);
  });
});

function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

// Close lightbox
btnClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Next image
btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

// Prev image
btnPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

// Close when clicking outside
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
