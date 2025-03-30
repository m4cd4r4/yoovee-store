/**
 * YooVee® Premium Fingerless Gloves - Product JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product components
    initProductGallery();
    initColorOptions();
    initSizeOptions();
    initQuantitySelector();
    initAddToCart();
});

/**
 * Product Gallery Functionality
 */
function initProductGallery() {
    // Removed duplicate comment and function definition line
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.product-gallery-prev');
    const nextBtn = document.querySelector('.product-gallery-next');
    
    if (!mainImage || thumbnails.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentImageIndex = 0;
    
    // Function to update the gallery based on index
    function updateGallery(index) {
        // Ensure index is within bounds
        currentImageIndex = (index + thumbnails.length) % thumbnails.length;
        
        // Update active thumbnail
        thumbnails.forEach((t, i) => {
            t.classList.toggle('active', i === currentImageIndex);
        });
        
        // Get image filename from the new active thumbnail
        const activeThumbnail = thumbnails[currentImageIndex];
        const imageFile = activeThumbnail.getAttribute('data-image');
        
        // Update main image
        updateMainImage(imageFile);
    }
    
    // Add click listeners to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            updateGallery(index);
        });
    });
    
    // Add click listeners to navigation arrows
    prevBtn.addEventListener('click', function() {
        updateGallery(currentImageIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        updateGallery(currentImageIndex + 1);
    });
    
    // Function to update main image (with fade effect)
    function updateMainImage(imageFile) {
        if (!imageFile) return;
        
        // Add fade effect
        mainImage.style.opacity = '0';
        
        // Update image source
        setTimeout(() => {
            mainImage.src = `images/${imageFile}`;
            mainImage.style.opacity = '1';
        }, 50);
    }
    
    // Initialize product zoom functionality
    initProductZoom();
} // Added the missing closing brace for the outer initProductGallery

/**
 * Color Options Functionality
 */
function initColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (colorOptions.length === 0) return;
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Only allow clicking on options that are not out of stock
            if (!this.classList.contains('out-of-stock')) {
                // Update active color
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

/**
 * Size Options Functionality
 */
function initSizeOptions() {
    const sizeOptions = document.querySelectorAll('.size-option');
    
    if (sizeOptions.length === 0) return;
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Only allow clicking on options that are not out of stock
            if (!this.classList.contains('out-of-stock')) {
                // Update active size
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

/**
 * Quantity Selector Functionality
 */
function initQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-selector .minus');
    const plusBtn = document.querySelector('.quantity-selector .plus');
    const quantityInput = document.querySelector('.quantity-selector .quantity-input');
    
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

/**
 * Add to Cart Functionality
 * Note: This functionality has been moved to cart.js
 */
function initAddToCart() {
    // This function is now handled by cart.js
    console.log('Add to cart functionality moved to cart.js');
}

/**
 * Show Notification
 * @param {string} message - The message to display
 */
function showNotification(message) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '9999';
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = 'var(--shadow)';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    notification.style.transition = 'all 0.3s ease-in-out';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Product Zoom Functionality
 */
function initProductZoom() {
    const mainImage = document.getElementById('main-product-image');
    const mainImageContainer = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail img');
    
    if (!mainImage || !mainImageContainer) return;
    
    // Create image modal elements
    const imageModal = document.createElement('div');
    imageModal.className = 'image-modal';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-image-modal';
    closeBtn.innerHTML = '&times;';
    const modalImg = document.createElement('img');
    modalImg.className = 'image-modal-content';
    
    // Create navigation arrows for the modal
    const prevBtnModal = document.createElement('button');
    prevBtnModal.className = 'image-modal-nav image-modal-prev';
    prevBtnModal.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtnModal.setAttribute('aria-label', 'Previous image');
    
    const nextBtnModal = document.createElement('button');
    nextBtnModal.className = 'image-modal-nav image-modal-next';
    nextBtnModal.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtnModal.setAttribute('aria-label', 'Next image');
    
    imageModal.appendChild(closeBtn);
    imageModal.appendChild(modalImg);
    imageModal.appendChild(prevBtnModal); // Add prev arrow
    imageModal.appendChild(nextBtnModal); // Add next arrow
    document.body.appendChild(imageModal);
    
    let currentModalImageIndex = 0;
    const galleryThumbnails = document.querySelectorAll('.thumbnail'); // Get all thumbnails for indexing
    
    // Function to open the modal and set the image
    function openImageModal(index) {
        currentModalImageIndex = index;
        const imagePath = 'images/' + galleryThumbnails[currentModalImageIndex].getAttribute('data-image');
        modalImg.src = imagePath;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Add click event to main image to open modal
    mainImage.addEventListener('click', function() {
        // Find the index of the currently active thumbnail
        const activeThumbnail = document.querySelector('.thumbnail.active');
        const activeIndex = Array.from(galleryThumbnails).indexOf(activeThumbnail);
        openImageModal(activeIndex >= 0 ? activeIndex : 0);
    });
    
    // Add click events to thumbnails to open modal
    galleryThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function(e) {
            // This listener in initProductGallery handles the main image update.
            // We need a separate listener on the *image* inside the thumbnail for the modal.
            const thumbImg = thumbnail.querySelector('img');
            if (thumbImg) {
                thumbImg.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent gallery update listener
                    openImageModal(index);
                });
            }
        });
    });
    
    // Modal Navigation Logic
    prevBtnModal.addEventListener('click', function(e) {
        e.stopPropagation();
        const newIndex = (currentModalImageIndex - 1 + galleryThumbnails.length) % galleryThumbnails.length;
        openImageModal(newIndex); // Re-use open function to update index and image
    });
    
    nextBtnModal.addEventListener('click', function(e) {
        e.stopPropagation();
        const newIndex = (currentModalImageIndex + 1) % galleryThumbnails.length;
        openImageModal(newIndex); // Re-use open function to update index and image
    });
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
    
    // Hover zoom effect (original functionality)
    mainImageContainer.addEventListener('mousemove', function(e) {
        // Get cursor position
        const rect = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage
        const xPercent = x / rect.width * 100;
        const yPercent = y / rect.height * 100;
        
        // Apply zoom effect
        mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        mainImage.style.transform = 'scale(1.5)';
    });
    
    mainImageContainer.addEventListener('mouseleave', function() {
        mainImage.style.transform = 'scale(1)';
    });
}

/**
 * Related Products Functionality
 */
function initRelatedProducts() {
    // This would be implemented if there were related products in the design
    // For now, it's just a placeholder for future implementation
}

/**
 * Product Reviews Functionality
 */
function initProductReviews() {
    // This would be implemented if there were product reviews in the design
    // For now, it's just a placeholder for future implementation
}
