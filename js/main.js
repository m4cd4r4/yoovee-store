/**
 * YooVee® Premium Fingerless Gloves - Main JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initFaqAccordion();
    initCartSidebar();
    initCheckoutModal();
    initSmoothScroll();
    initHeaderScroll();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle menu icon
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
    });
}

/**
 * FAQ Accordion Functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
}

/**
 * Cart Sidebar Functionality
 */
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon a');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const overlay = document.getElementById('overlay');
    const continueShopping = document.querySelectorAll('.continue-shopping');
    
    if (!cartIcon || !cartSidebar || !closeSidebar || !overlay) return;
    
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
    continueShopping.forEach(button => {
        button.addEventListener('click', closeCart);
    });
}

/**
 * Checkout Modal Functionality
 */
function initCheckoutModal() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close-modal');
    const overlay = document.getElementById('overlay');
    const continueShopping = document.querySelector('#step-confirmation .continue-shopping');
    
    if (!checkoutBtn || !checkoutModal || !closeModal || !overlay) return;
    
    // Open checkout modal
    checkoutBtn.addEventListener('click', function() {
        checkoutModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close checkout modal
    function closeCheckout() {
        checkoutModal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeModal.addEventListener('click', closeCheckout);
    overlay.addEventListener('click', closeCheckout);
    
    if (continueShopping) {
        continueShopping.addEventListener('click', closeCheckout);
    }
    
    // Multi-step checkout process
    const informationForm = document.getElementById('information-form');
    const paymentForm = document.getElementById('payment-form');
    const backBtn = document.querySelector('.back-btn');
    
    if (informationForm && paymentForm && backBtn) {
        // Continue to payment
        informationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('step-information').classList.remove('active');
            document.getElementById('step-payment').classList.add('active');
            document.querySelector('[data-step="information"]').classList.remove('active');
            document.querySelector('[data-step="payment"]').classList.add('active');
        });
        
        // Back to information
        backBtn.addEventListener('click', function() {
            document.getElementById('step-payment').classList.remove('active');
            document.getElementById('step-information').classList.add('active');
            document.querySelector('[data-step="payment"]').classList.remove('active');
            document.querySelector('[data-step="information"]').classList.add('active');
        });
        
        // Complete order
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('step-payment').classList.remove('active');
            document.getElementById('step-confirmation').classList.add('active');
            document.querySelector('[data-step="payment"]').classList.remove('active');
            document.querySelector('[data-step="confirmation"]').classList.add('active');
            
            // Generate random order number
            const orderNumber = 'YV-' + Math.floor(10000 + Math.random() * 90000);
            document.getElementById('order-number').textContent = orderNumber;
            
            // Get email from form
            const email = document.getElementById('email').value;
            document.getElementById('confirmation-email').textContent = email;
        });
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

/**
 * Smooth Scroll Functionality
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

/**
 * Cart Functionality
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
            const cartData = JSON.parse(savedCart);
            this.items = cartData.items || [];
            this.updateCartSummary();
        }
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
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        
        if (!cartItemsContainer) return;
        
        // Clear current items
        while (cartItemsContainer.firstChild) {
            cartItemsContainer.removeChild(cartItemsContainer.firstChild);
        }
        
        // Show empty cart message if no items
        if (this.items.length === 0) {
            cartItemsContainer.appendChild(emptyCartMessage);
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

// Initialize cart
const cart = new Cart();
