// Customer Reviews Carousel
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsCarousel();
    initializeImageModal();
});

function initializeReviewsCarousel() {
    // Get carousel elements
    const slides = document.querySelectorAll('.customer-photo-slide');
    if (!slides.length) return; // Exit if no slides found
    
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Deactivate all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        
        // Activate the corresponding indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    }
    
    // Function to show previous slide
    function prevSlide() {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
        });
    });
    
    // Auto rotate carousel
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-rotation when hovering over carousel
    const carousel = document.querySelector('.customer-photos-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            carouselInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        }, false);
        
        carousel.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - show next slide
            nextSlide();
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right - show previous slide
            prevSlide();
        }
    }
    
    // Initialize by showing the first slide
    showSlide(0);
}

function initializeImageModal() {
    // This function is now handled by image-modal.js
    // Keeping this function as a placeholder to avoid breaking any references to it
    console.log('Image modal initialization moved to image-modal.js');
}
