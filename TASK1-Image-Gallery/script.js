// Select all gallery images
const galleryImages = document.querySelectorAll(".gallery img");

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnClose = document.getElementById("close");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");

// Track current image index
let currentIndex = 0;

// When image is clicked → open lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    openLightbox(img.src);
  });
});

// Function to open lightbox
function openLightbox(imgSrc) {
  lightbox.style.display = "flex";
  lightboxImg.src = imgSrc;
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

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
