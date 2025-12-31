/**
 * YooVee - Cart JavaScript
 * Minimalist Redesign
 */

document.addEventListener('DOMContentLoaded', function() {
    initCartFunctionality();
});

/**
 * Cart Functionality
 */
function initCartFunctionality() {
    const cartIcon = document.querySelector('.header__cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const overlay = document.getElementById('overlay');
    const continueShopping = document.querySelectorAll('.continue-shopping');

    // Initialize cart
    const cart = new Cart();

    // Sidebar logic
    if (cartSidebar) {
        function closeCart() {
            cartSidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (closeSidebar) closeSidebar.addEventListener('click', closeCart);
        if (overlay) overlay.addEventListener('click', closeCart);

        continueShopping.forEach(button => {
            button.addEventListener('click', closeCart);
        });

        const sidebarCheckoutBtn = cartSidebar.querySelector('.checkout-btn');
        if (sidebarCheckoutBtn) {
            sidebarCheckoutBtn.addEventListener('click', function() {
                window.location.href = 'cart.html';
            });
        }
    }

    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = 'YooVee® Fingerless Gloves';
            const productPrice = 29.99;

            // Get product image
            let productImage = 'images/Product/glove-1.jpg';
            const activeThumb = document.querySelector('.hero__thumbnail.active');
            if (activeThumb) {
                const imageFile = activeThumb.getAttribute('data-image');
                productImage = `images/${imageFile}`;
            }

            // Get selected options
            const selectedColor = document.querySelector('.color-option.active');
            const color = selectedColor ? selectedColor.getAttribute('data-color') : 'grey';

            const selectedSize = document.querySelector('.size-option.active');
            const size = selectedSize ? selectedSize.getAttribute('data-size') : 'S';

            const quantityInput = document.querySelector('.quantity-selector__input');
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

            // Show notification
            if (typeof showNotification === 'function') {
                showNotification('Added to bag');
            }

            // Open cart sidebar
            if (cartSidebar && overlay) {
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
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
        const savedCart = localStorage.getItem('yooveeCart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                this.items = cartData.items || [];
                this.updateCartSummary();
            } catch (e) {
                console.error('Error loading cart:', e);
                localStorage.removeItem('yooveeCart');
            }
        }
        this.renderCartItems();
    }

    addItem(product) {
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
        const cartCounts = document.querySelectorAll('.cart-count, .header__cart-count');
        cartCounts.forEach(el => {
            el.textContent = this.count;
            el.setAttribute('data-count', this.count);
        });

        // Update totals
        const cartSubtotal = document.querySelector('.cart-subtotal');
        const cartTotal = document.querySelector('.cart-total');

        if (cartSubtotal) cartSubtotal.textContent = `$${this.total.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${this.total.toFixed(2)}`;

        // Enable/disable checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.count === 0;
        }
    }

    renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;

        // Clear current items
        cartItemsContainer.innerHTML = '';

        // Show empty message if no items
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your bag is empty</p>
                </div>
            `;
            return;
        }

        // Render each item
        this.items.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" width="80" height="80">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.color}, ${item.size}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">&minus;</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners
        cartItemsContainer.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                this.updateQuantity(index, this.items[index].quantity - 1);
            });
        });

        cartItemsContainer.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                this.updateQuantity(index, this.items[index].quantity + 1);
            });
        });

        cartItemsContainer.querySelectorAll('.remove-item').forEach(button => {
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
