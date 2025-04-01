function openLightbox(imageUrl) {
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");

    lightboxImg.src = imageUrl;
    lightbox.classList.add("show");  // Add class to show modal
}

function closeLightbox() {
    let lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("show");  // Remove class to hide modal
}
