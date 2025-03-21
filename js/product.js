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
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.product-prev');
    const nextBtn = document.querySelector('.product-next');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    // Keep track of current image index
    let currentImageIndex = 0;
    
    // Function to navigate to a specific image
    function navigateTo(index) {
        // Ensure index is within bounds
        if (index < 0) index = thumbnails.length - 1;
        if (index >= thumbnails.length) index = 0;
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[index].classList.add('active');
        
        // Get image filename
        const imageFile = thumbnails[index].getAttribute('data-image');
        
        // Update main image
        updateMainImage(imageFile);
        
        // Update current index
        currentImageIndex = index;
    }
    
    // Function to go to previous image
    function goToPrevImage() {
        navigateTo(currentImageIndex - 1);
    }
    
    // Function to go to next image
    function goToNextImage() {
        navigateTo(currentImageIndex + 1);
    }
    
    // Add click events to previous and next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrevImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNextImage);
    }
    
    // Add click events to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            navigateTo(index);
        });
    });
    
    // Add keyboard navigation when gallery is in focus
    const productGallery = document.querySelector('.product-gallery');
    if (productGallery) {
        productGallery.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                goToPrevImage();
            } else if (e.key === 'ArrowRight') {
                goToNextImage();
            }
        });
    }
    
    // Function to update main image
    function updateMainImage(imageFile) {
        if (!imageFile) return;
        
        // Add fade effect
        mainImage.style.opacity = '0';
        
        // Update image source - using the path from the data-image attribute which now includes the Product directory
        setTimeout(() => {
            mainImage.src = `images/${imageFile}`;
            mainImage.style.opacity = '1';
        }, 50);
    }
    
    // Initialize product zoom functionality
    initProductZoom();
}

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
    const prevModalBtn = document.createElement('div');
    prevModalBtn.className = 'modal-nav modal-prev';
    prevModalBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevModalBtn.setAttribute('aria-label', 'Previous image');
    
    const nextModalBtn = document.createElement('div');
    nextModalBtn.className = 'modal-nav modal-next';
    nextModalBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextModalBtn.setAttribute('aria-label', 'Next image');
    
    imageModal.appendChild(closeBtn);
    imageModal.appendChild(modalImg);
    imageModal.appendChild(prevModalBtn);
    imageModal.appendChild(nextModalBtn);
    document.body.appendChild(imageModal);
    
    // Keep track of current image index for modal navigation
    let currentModalIndex = 0;
    const imageFiles = Array.from(thumbnails).map(thumbnail => 
        thumbnail.parentElement.getAttribute('data-image')
    );
    
    // Function to navigate modal images
    function navigateModalImage(direction) {
        if (direction === 'prev') {
            currentModalIndex = (currentModalIndex === 0) ? imageFiles.length - 1 : currentModalIndex - 1;
        } else {
            currentModalIndex = (currentModalIndex === imageFiles.length - 1) ? 0 : currentModalIndex + 1;
        }
        
        // Update modal image
        modalImg.src = `images/${imageFiles[currentModalIndex]}`;
    }
    
    // Add click events to modal navigation buttons
    prevModalBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateModalImage('prev');
    });
    
    nextModalBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateModalImage('next');
    });
    
    // Add click event to main image
    mainImage.addEventListener('click', function() {
        // Find the index of the current image
        const currentSrc = mainImage.src.split('/').pop();
        currentModalIndex = imageFiles.findIndex(file => file === currentSrc);
        if (currentModalIndex === -1) currentModalIndex = 0;
        
        imageModal.style.display = 'block';
        modalImg.src = this.src;
    });
    
    // Add click events to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function(e) {
            // Prevent the default thumbnail behavior
            e.stopPropagation();
            
            // Get the full-size image path
            const imageFile = this.parentElement.getAttribute('data-image');
            currentModalIndex = index;
            
            // Open in modal - using the full path including the Product directory
            imageModal.style.display = 'block';
            modalImg.src = `images/${imageFile}`;
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
    
    // Add keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (imageModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateModalImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateModalImage('next');
            } else if (e.key === 'Escape') {
                imageModal.style.display = 'none';
            }
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
