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
