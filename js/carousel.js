// Customer Reviews Carousel
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsCarousel();
    initializeImageModal();
    enhanceCustomerReviewsCarousel(); // Added enhancement function
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

// 5. Add zoom and expand to customer reviews carousel
function enhanceCustomerReviewsCarousel() {
    const carouselPhotos = document.querySelectorAll('.carousel-photo');
    
    if (!carouselPhotos.length) return;
    
    // Create an image modal for expanded view if it doesn't exist
    let reviewsModal = document.querySelector('.reviews-image-modal');
    
    if (!reviewsModal) {
        reviewsModal = document.createElement('div');
        reviewsModal.className = 'reviews-image-modal';
        reviewsModal.style.display = 'none';
        reviewsModal.style.position = 'fixed';
        reviewsModal.style.zIndex = '2000';
        reviewsModal.style.left = '0';
        reviewsModal.style.top = '0';
        reviewsModal.style.width = '100%';
        reviewsModal.style.height = '100%';
        reviewsModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        reviewsModal.style.overflow = 'auto';
        
        reviewsModal.innerHTML = `
            <span class="close-reviews-modal" style="position: absolute; top: 20px; right: 30px; color: white; font-size: 40px; font-weight: 300; cursor: pointer; z-index: 2001;">&times;</span>
            <div class="reviews-modal-content-wrapper" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; height: 80%; display: flex; justify-content: center; align-items: center;">
                <img class="reviews-modal-content" style="max-width: 100%; max-height: 100%; display: block;">
            </div>
            <div class="reviews-modal-comment" style="color: white; text-align: center; margin-top: 20px; padding: 0 20px; position: absolute; bottom: 50px; width: 100%;"></div>
            <div class="reviews-modal-nav reviews-modal-prev" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background-color: rgba(255, 255, 255, 0.2); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2001;">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="reviews-modal-nav reviews-modal-next" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background-color: rgba(255, 255, 255, 0.2); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2001;">
                <i class="fas fa-chevron-right"></i>
            </div>
            <div class="reviews-modal-zoom-controls" style="position: absolute; bottom: 20px; right: 20px; display: flex; gap: 10px;">
                <button class="reviews-modal-zoom-in" style="background-color: rgba(255, 255, 255, 0.2); color: white; width: 40px; height: 40px; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-search-plus"></i>
                </button>
                <button class="reviews-modal-zoom-out" style="background-color: rgba(255, 255, 255, 0.2); color: white; width: 40px; height: 40px; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-search-minus"></i>
                </button>
                <button class="reviews-modal-reset-zoom" style="background-color: rgba(255, 255, 255, 0.2); color: white; width: 40px; height: 40px; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(reviewsModal);
    }
    
    // Get modal elements
    const modalImg = reviewsModal.querySelector('.reviews-modal-content');
    const modalComment = reviewsModal.querySelector('.reviews-modal-comment');
    const closeBtn = reviewsModal.querySelector('.close-reviews-modal');
    const prevBtn = reviewsModal.querySelector('.reviews-modal-prev');
    const nextBtn = reviewsModal.querySelector('.reviews-modal-next');
    const zoomInBtn = reviewsModal.querySelector('.reviews-modal-zoom-in');
    const zoomOutBtn = reviewsModal.querySelector('.reviews-modal-zoom-out');
    const resetZoomBtn = reviewsModal.querySelector('.reviews-modal-reset-zoom');
    
    // Add zoom level state and references
    let currentZoom = 1;
    let currentReviewIndex = 0;
    const modalContentWrapper = reviewsModal.querySelector('.reviews-modal-content-wrapper');
    
    // Add expand icon and zoom cursor to carousel photos
    carouselPhotos.forEach((photo, index) => {
        // Add expand icon if it doesn't exist
        let expandIcon = photo.nextElementSibling;
        if (!expandIcon || !expandIcon.classList.contains('expand-icon')) {
            expandIcon = document.createElement('div');
            expandIcon.className = 'expand-icon';
            expandIcon.innerHTML = '<i class="fas fa-expand-alt"></i>';
            
            // Insert after the photo
            photo.parentNode.insertBefore(expandIcon, photo.nextSibling);
        }
        
        // Open modal on photo click
        photo.addEventListener('click', function() {
            openReviewsModal(index);
        });
        
        // Open modal on expand icon click
        expandIcon.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the photo click
            openReviewsModal(index);
        });
    });
    
    // Function to open modal with specific review
    function openReviewsModal(index) {
        // Get current review image and comment
        const slides = document.querySelectorAll('.customer-photo-slide');
        const currentSlide = slides[index];
        const currentPhoto = currentSlide.querySelector('.carousel-photo');
        const currentComment = currentSlide.querySelector('.carousel-comment');
        
        // Update modal content
        modalImg.src = currentPhoto.src;
        modalComment.textContent = currentComment.textContent;
        
        // Reset zoom
        currentZoom = 1;
        modalImg.style.transform = `scale(${currentZoom})`;
        modalContentWrapper.style.transform = 'translate(-50%, -50%)';
        
        // Show modal
        reviewsModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Update current index
        currentReviewIndex = index;
    }
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        reviewsModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close when clicking outside the image
    reviewsModal.addEventListener('click', function(e) {
        if (e.target === reviewsModal) {
            reviewsModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateReviews('prev');
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateReviews('next');
    });
    
    // Zoom controls
    zoomInBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentZoom += 0.2;
        if (currentZoom > 3) currentZoom = 3; // Max zoom
        modalImg.style.transform = `scale(${currentZoom})`;
    });
    
    zoomOutBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentZoom -= 0.2;
        if (currentZoom < 0.5) currentZoom = 0.5; // Min zoom
        modalImg.style.transform = `scale(${currentZoom})`;
    });
    
    resetZoomBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentZoom = 1;
        modalImg.style.transform = `scale(${currentZoom})`;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (reviewsModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateReviews('prev');
            } else if (e.key === 'ArrowRight') {
                navigateReviews('next');
            } else if (e.key === 'Escape') {
                reviewsModal.style.display = 'none';
                document.body.style.overflow = '';
            } else if (e.key === '+') {
                currentZoom += 0.2;
                if (currentZoom > 3) currentZoom = 3;
                modalImg.style.transform = `scale(${currentZoom})`;
            } else if (e.key === '-') {
                currentZoom -= 0.2;
                if (currentZoom < 0.5) currentZoom = 0.5;
                modalImg.style.transform = `scale(${currentZoom})`;
            } else if (e.key === '0') {
                currentZoom = 1;
                modalImg.style.transform = `scale(${currentZoom})`;
            }
        }
    });
    
    // Function to navigate between reviews
    function navigateReviews(direction) {
        const slides = document.querySelectorAll('.customer-photo-slide');
        
        if (direction === 'prev') {
            currentReviewIndex = (currentReviewIndex === 0) ? slides.length - 1 : currentReviewIndex - 1;
        } else {
            currentReviewIndex = (currentReviewIndex === slides.length - 1) ? 0 : currentReviewIndex + 1;
        }
        
        const currentSlide = slides[currentReviewIndex];
        const currentPhoto = currentSlide.querySelector('.carousel-photo');
        const currentComment = currentSlide.querySelector('.carousel-comment');
        
        // Update modal content
        modalImg.src = currentPhoto.src;
        modalComment.textContent = currentComment.textContent;
        
        // Reset zoom
        currentZoom = 1;
        modalImg.style.transform = `scale(${currentZoom})`;
    }
}
