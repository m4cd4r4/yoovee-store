/**
 * YooVee® Premium Fingerless Gloves - Cart JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart functionality
    initCartFunctionality();
});

/**
 * Cart Functionality
 */
function initCartFunctionality() {
    console.log('Initializing cart functionality...');
    
    try {
        // Get cart elements
        const cartIcon = document.querySelector('.cart-icon a');
        console.log('Cart icon:', cartIcon);
        
        const cartSidebar = document.getElementById('cart-sidebar');
        console.log('Cart sidebar:', cartSidebar);
        
        const closeSidebar = document.querySelector('.close-sidebar');
        console.log('Close sidebar button:', closeSidebar);
        
        const overlay = document.getElementById('overlay');
        console.log('Overlay:', overlay);
        
        const continueShopping = document.querySelectorAll('.continue-shopping');
        console.log('Continue shopping buttons:', continueShopping);
        
        // Check if required elements exist
        if (!cartIcon) {
            console.warn('Cart icon not found');
            return;
        }
        
        if (!cartSidebar) {
            console.warn('Cart sidebar not found');
            return;
        }
        
        if (!closeSidebar) {
            console.warn('Close sidebar button not found');
            return;
        }
        
        if (!overlay) {
            console.warn('Overlay not found');
            return;
        }
        
        // Open cart sidebar
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close cart sidebar
        function closeCart() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeSidebar.addEventListener('click', closeCart);
        overlay.addEventListener('click', closeCart);
        
        // Continue shopping buttons
        if (continueShopping && continueShopping.length > 0) {
            continueShopping.forEach(button => {
                button.addEventListener('click', closeCart);
            });
        }
    
        // Initialize cart
        const cart = new Cart();
        
        // Add to cart button
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                // Get product details
                const productNameElement = document.querySelector('.product-details h3');
                const productName = productNameElement ? productNameElement.textContent : 'YooVee® Premium Fingerless Gloves';
                
                const priceElement = document.querySelector('.price');
                const productPrice = priceElement ? parseFloat(priceElement.textContent.replace(/[^\d.]/g, '')) : 24.99;
                
                // Get product image from current view
                let productImage = '';
                const mainImage = document.getElementById('main-product-image');
                if (mainImage) {
                    // Get the current image filename from active thumbnail
                    const activeThumb = document.querySelector('.thumbnail.active');
                    const imageFile = activeThumb ? activeThumb.getAttribute('data-image') : 'glove-1.jpg';
                    productImage = `images/${imageFile}`;
                }
                
                // Get selected color
                const selectedColor = document.querySelector('.color-option.active');
                const color = selectedColor ? selectedColor.getAttribute('data-color') : 'Light Gray';
                
                // Get selected size
                const selectedSize = document.querySelector('.size-option.active');
                const size = selectedSize ? selectedSize.getAttribute('data-size') : 'M';
                
                // Get quantity
                const quantityInput = document.querySelector('.quantity-input');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                // Create product object
                const product = {
                    id: 'yoovee-gloves',
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    color: color,
                    size: size,
                    quantity: quantity
                };
                
                // Add to cart
                cart.addItem(product);
                
                // Show success message
                showNotification('Product added to cart!');
                
                // Open cart sidebar
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    } catch (error) {
        console.error('Error initializing cart functionality:', error);
    }
}

/**
 * Cart Class
 */
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.count = 0;
        this.init();
    }
    
    init() {
        // Load cart from localStorage if available
        const savedCart = localStorage.getItem('yooveeCart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                this.items = cartData.items || [];
                this.updateCartSummary();
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
                localStorage.removeItem('yooveeCart');
            }
        }
        
        // Render cart items
        this.renderCartItems();
    }
    
    addItem(product) {
        // Check if product already exists in cart
        const existingItem = this.items.find(item => 
            item.id === product.id && 
            item.color === product.color && 
            item.size === product.size
        );
        
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }
        
        this.updateCartSummary();
        this.saveCart();
        this.renderCartItems();
    }
    
    removeItem(index) {
        this.items.splice(index, 1);
        this.updateCartSummary();
        this.saveCart();
        this.renderCartItems();
    }
    
    updateQuantity(index, quantity) {
        if (quantity < 1) quantity = 1;
        if (quantity > 10) quantity = 10;
        
        this.items[index].quantity = quantity;
        this.updateCartSummary();
        this.saveCart();
        this.renderCartItems();
    }
    
    updateCartSummary() {
        this.count = this.items.reduce((total, item) => total + item.quantity, 0);
        this.total = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.count;
        }
        
        // Update cart subtotal and total
        const cartSubtotal = document.querySelector('.cart-subtotal');
        const cartTotal = document.querySelector('.cart-total');
        
        if (cartSubtotal && cartTotal) {
            cartSubtotal.textContent = `$${this.total.toFixed(2)}`;
            cartTotal.textContent = `$${this.total.toFixed(2)}`;
        }
        
        // Enable/disable checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.count === 0;
        }
    }
    
    renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;
        
        // Get empty cart message
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        
        // Clear current items
        while (cartItemsContainer.firstChild) {
            cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }
        
        // Show empty cart message if no items
        if (this.items.length === 0) {
            if (emptyCartMessage) {
                cartItemsContainer.appendChild(emptyCartMessage);
            } else {
                // Create empty cart message if it doesn't exist
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-cart-message';
                emptyMessage.innerHTML = `
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                `;
                cartItemsContainer.appendChild(emptyMessage);
            }
            return;
        }
        
        // Hide empty cart message
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';
        }
        
        // Render each item
        this.items.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Create cart item elements
            const cartItemImage = document.createElement('div');
            cartItemImage.className = 'cart-item-image';
            
            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.name;
            imgElement.width = 80;
            imgElement.height = 80;
            cartItemImage.appendChild(imgElement);
            
            // Create details element
            const cartItemDetails = document.createElement('div');
            cartItemDetails.className = 'cart-item-details';
            cartItemDetails.innerHTML = `
                <h4>${item.name}</h4>
                <p>Color: ${item.color}, Size: ${item.size}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
            `;
            
            // Create price element
            const cartItemPrice = document.createElement('div');
            cartItemPrice.className = 'cart-item-price';
            cartItemPrice.innerHTML = `
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            
            // Append all elements to cart item
            cartItem.appendChild(cartItemImage);
            cartItem.appendChild(cartItemDetails);
            cartItem.appendChild(cartItemPrice);
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners for quantity buttons and remove buttons
        const minusButtons = cartItemsContainer.querySelectorAll('.minus');
        const plusButtons = cartItemsContainer.querySelectorAll('.plus');
        const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
        
        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                this.updateQuantity(index, this.items[index].quantity - 1);
            });
        });
        
        plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                this.updateQuantity(index, this.items[index].quantity + 1);
            });
        });
        
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                this.removeItem(index);
            });
        });
    }
    
    saveCart() {
        localStorage.setItem('yooveeCart', JSON.stringify({
            items: this.items
        }));
    }
    
    clearCart() {
        this.items = [];
        this.updateCartSummary();
        this.saveCart();
        this.renderCartItems();
    }
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
