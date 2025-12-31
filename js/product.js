/**
 * YooVee - Product JavaScript
 * Minimalist Redesign
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initColorOptions();
    initSizeOptions();
    initQuantitySelector();
});

/**
 * Product Gallery
 */
function initProductGallery() {
    const mainImageContainer = document.querySelector('.hero__main-image');
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.hero__thumbnail');
    const prevBtn = document.querySelector('.hero__gallery-nav--prev');
    const nextBtn = document.querySelector('.hero__gallery-nav--next');

    if (!mainImageContainer || !mainImage || thumbnails.length === 0) return;

    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    function updateGallery(index) {
        currentImageIndex = (index + thumbnails.length) % thumbnails.length;

        thumbnails.forEach((t, i) => {
            t.classList.toggle('active', i === currentImageIndex);
            t.setAttribute('aria-checked', i === currentImageIndex ? 'true' : 'false');
        });

        const activeThumbnail = thumbnails[currentImageIndex];
        const imageFile = activeThumbnail.getAttribute('data-image');
        updateMainImage(imageFile);
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            updateGallery(index);
        });

        thumbnail.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                updateGallery(index);
            }
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            updateGallery(currentImageIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            updateGallery(currentImageIndex + 1);
        });
    }

    // Touch swipe
    mainImageContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImageContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance < 0) {
                updateGallery(currentImageIndex + 1);
            } else {
                updateGallery(currentImageIndex - 1);
            }
        }
        touchStartX = 0;
        touchEndX = 0;
    }

    function updateMainImage(imageFile) {
        if (!imageFile) return;

        mainImage.style.opacity = '0';
        mainImage.style.transition = 'opacity 0.2s ease';

        setTimeout(() => {
            mainImage.src = `images/${imageFile}`;
            mainImage.style.opacity = '1';
        }, 100);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const heroSection = document.querySelector('.hero');
        const isHeroInView = heroSection && heroSection.getBoundingClientRect().top < window.innerHeight;

        if (isHeroInView) {
            if (e.key === 'ArrowLeft') {
                updateGallery(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                updateGallery(currentImageIndex + 1);
            }
        }
    });
}

/**
 * Color Options
 */
function initColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');

    if (colorOptions.length === 0) return;

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (!this.classList.contains('out-of-stock')) {
                colorOptions.forEach(o => {
                    o.classList.remove('active');
                    o.setAttribute('aria-checked', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-checked', 'true');
            }
        });

        option.addEventListener('keydown', function(e) {
            if ((e.key === 'Enter' || e.key === ' ') && !this.classList.contains('out-of-stock')) {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Size Options
 */
function initSizeOptions() {
    const sizeOptions = document.querySelectorAll('.size-option');

    if (sizeOptions.length === 0) return;

    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (!this.classList.contains('out-of-stock')) {
                sizeOptions.forEach(o => {
                    o.classList.remove('active');
                    o.setAttribute('aria-checked', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-checked', 'true');
            }
        });

        option.addEventListener('keydown', function(e) {
            if ((e.key === 'Enter' || e.key === ' ') && !this.classList.contains('out-of-stock')) {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Quantity Selector
 */
function initQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-selector__btn.minus');
    const plusBtn = document.querySelector('.quantity-selector__btn.plus');
    const quantityInput = document.querySelector('.quantity-selector__input');

    if (!minusBtn || !plusBtn || !quantityInput) return;

    minusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    plusBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity < 10) {
            quantity++;
            quantityInput.value = quantity;
        }
    });

    quantityInput.addEventListener('change', function() {
        let quantity = parseInt(this.value);
        if (isNaN(quantity) || quantity < 1) {
            this.value = 1;
        } else if (quantity > 10) {
            this.value = 10;
        }
    });
}
