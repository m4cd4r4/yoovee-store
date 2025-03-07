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
    // Product gallery modal functionality
    const productImages = document.querySelectorAll('.main-image img, .thumbnail img');
    if (!productImages.length) return; // Exit if no product images found
    
    // Check if modal already exists, create if not
    let modal = document.querySelector('.image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="close-image-modal">&times;</span>
            <img class="image-modal-content">
            <div class="modal-nav modal-prev"><i class="fas fa-chevron-left"></i></div>
            <div class="modal-nav modal-next"><i class="fas fa-chevron-right"></i></div>
        `;
        document.body.appendChild(modal);
    }
    
    const modalImg = modal.querySelector('.image-modal-content');
    const closeBtn = modal.querySelector('.close-image-modal');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const imageUrls = Array.from(productImages).map(img => img.src);
    
    // Function to open modal with specific image
    function openModal(index) {
        modal.style.display = 'block';
        modalImg.src = imageUrls[index];
        currentImageIndex = index;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    // Add click event to all product images
    productImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            openModal(index);
        });
    });
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Navigation functionality
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
        modalImg.src = imageUrls[currentImageIndex];
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
        modalImg.src = imageUrls[currentImageIndex];
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
                modalImg.src = imageUrls[currentImageIndex];
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
                modalImg.src = imageUrls[currentImageIndex];
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
    
    // Touch swipe functionality for modal
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    modal.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - show next image
            currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
            modalImg.src = imageUrls[currentImageIndex];
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right - show previous image
            currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
            modalImg.src = imageUrls[currentImageIndex];
        }
    }
}
