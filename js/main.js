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
 * Note: This functionality has been moved to cart.js
 */
function initCartSidebar() {
    // This function is now handled by cart.js
    console.log('Cart sidebar initialization moved to cart.js');
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
 * Note: This functionality has been moved to cart.js
 */
// The Cart class has been moved to cart.js
