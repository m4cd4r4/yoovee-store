/**
 * YooVee® Premium Fingerless Gloves - Checkout JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout components
    initCheckoutForms();
    initPaymentMethodSelection();
    initFormValidation();
    initOrderSummary();
});

/**
 * Checkout Forms Functionality
 */
function initCheckoutForms() {
    const informationForm = document.getElementById('information-form');
    const paymentForm = document.getElementById('payment-form');
    const backBtn = document.querySelector('.back-btn');
    
    if (!informationForm || !paymentForm || !backBtn) return;
    
    // Continue to payment
    informationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateInformationForm()) return;
        
        // Proceed to payment step
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
        
        // Validate form
        if (!validatePaymentForm()) return;
        
        // Process payment (in a real application, this would connect to a payment gateway)
        processPayment();
        
        // Proceed to confirmation step
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
        
        // Clear cart
        if (typeof cart !== 'undefined') {
            cart.clearCart();
        }
    });
}

/**
 * Payment Method Selection Functionality
 */
function initPaymentMethodSelection() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    if (paymentMethods.length === 0) return;
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Update active payment method
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Check radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            
            // Show/hide payment form based on selected method
            const paymentForm = document.getElementById('payment-form');
            const selectedMethod = radio.id;
            
            if (selectedMethod === 'credit-card') {
                paymentForm.style.display = 'block';
            } else {
                // For other payment methods, we would typically redirect to their respective payment pages
                // For this demo, we'll just hide the credit card form
                paymentForm.style.display = 'none';
            }
        });
    });
}

/**
 * Form Validation Functionality
 */
function initFormValidation() {
    // Add input event listeners for real-time validation
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
    
    // Credit card input formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Add spaces after every 4 digits
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            // Limit to 16 digits (19 characters with spaces)
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.substring(0, 19);
            }
            
            this.value = formattedValue;
        });
    }
    
    // Expiry date input formatting
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            // Limit to 4 digits (5 characters with slash)
            if (value.length > 5) {
                value = value.substring(0, 5);
            }
            
            this.value = value;
        });
    }
    
    // CVV input formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 3 or 4 digits
            if (value.length > 4) {
                value = value.substring(0, 4);
            }
            
            this.value = value;
        });
    }
}

/**
 * Validate Information Form
 * @returns {boolean} - Whether the form is valid
 */
function validateInformationForm() {
    const email = document.getElementById('email');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const postalCode = document.getElementById('postal-code');
    const country = document.getElementById('country');
    const phone = document.getElementById('phone');
    
    let isValid = true;
    
    // Validate each field
    if (!validateInput(email)) isValid = false;
    if (!validateInput(firstName)) isValid = false;
    if (!validateInput(lastName)) isValid = false;
    if (!validateInput(address)) isValid = false;
    if (!validateInput(city)) isValid = false;
    if (!validateInput(postalCode)) isValid = false;
    if (!validateInput(country)) isValid = false;
    if (!validateInput(phone)) isValid = false;
    
    return isValid;
}

/**
 * Validate Payment Form
 * @returns {boolean} - Whether the form is valid
 */
function validatePaymentForm() {
    const selectedPaymentMethod = document.querySelector('.payment-method.active input');
    
    if (!selectedPaymentMethod) {
        showError('Please select a payment method');
        return false;
    }
    
    // If credit card is selected, validate credit card fields
    if (selectedPaymentMethod.id === 'credit-card') {
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const cardName = document.getElementById('card-name');
        
        let isValid = true;
        
        // Validate each field
        if (!validateInput(cardNumber)) isValid = false;
        if (!validateInput(expiryDate)) isValid = false;
        if (!validateInput(cvv)) isValid = false;
        if (!validateInput(cardName)) isValid = false;
        
        return isValid;
    }
    
    // For other payment methods, we would typically redirect to their respective payment pages
    // For this demo, we'll just return true
    return true;
}

/**
 * Validate Input
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    if (!input) return false;
    
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if required
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        // Validate based on input type
        switch (input.id) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
                
            case 'card-number':
                const cardNumberRegex = /^[\d\s]{13,19}$/;
                if (!cardNumberRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid card number';
                }
                break;
                
            case 'expiry-date':
                const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
                if (!expiryDateRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid expiry date (MM/YY)';
                } else {
                    // Check if card is expired
                    const [month, year] = value.split('/');
                    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
                    const currentDate = new Date();
                    
                    if (expiryDate < currentDate) {
                        isValid = false;
                        errorMessage = 'Card is expired';
                    }
                }
                break;
                
            case 'cvv':
                const cvvRegex = /^[0-9]{3,4}$/;
                if (!cvvRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid CVV';
                }
                break;
        }
    }
    
    // Show or hide error message
    const errorElement = input.nextElementSibling;
    if (!isValid) {
        // Create error element if it doesn't exist
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.style.color = 'var(--danger)';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '0.25rem';
            input.parentNode.insertBefore(error, input.nextSibling);
            error.textContent = errorMessage;
        } else {
            errorElement.textContent = errorMessage;
        }
        
        // Add error styling to input
        input.style.borderColor = 'var(--danger)';
    } else {
        // Remove error element if it exists
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Remove error styling from input
        input.style.borderColor = '';
    }
    
    return isValid;
}

/**
 * Process Payment
 * In a real application, this would connect to a payment gateway
 */
function processPayment() {
    // This is a placeholder for payment processing
    // In a real application, this would connect to a payment gateway like Stripe, PayPal, etc.
    console.log('Processing payment...');
    
    // Simulate payment processing delay
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Payment processed successfully');
            resolve();
        }, 1000);
    });
}

/**
 * Order Summary Functionality
 */
function initOrderSummary() {
    // Update order summary based on cart items
    if (typeof cart !== 'undefined') {
        updateOrderSummary();
    }
}

/**
 * Update Order Summary
 */
function updateOrderSummary() {
    const orderSummary = document.querySelector('.order-summary');
    
    if (!orderSummary) return;
    
    // Clear current items
    const summaryItems = orderSummary.querySelectorAll('.summary-item:not(:last-child)');
    summaryItems.forEach(item => item.remove());
    
    // Get cart items
    const cartItems = cart.items;
    
    // Calculate subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate shipping (fixed at $4.99 for this demo)
    const shipping = 4.99;
    
    // Calculate tax (9% for this demo)
    const tax = subtotal * 0.09;
    
    // Calculate total
    const total = subtotal + shipping + tax;
    
    // Update summary
    const summaryTotal = orderSummary.querySelector('.summary-total');
    
    // Add cart items
    cartItems.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} (${item.color}, ${item.size}) x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        
        orderSummary.insertBefore(summaryItem, summaryTotal);
    });
    
    // Add shipping
    const shippingItem = document.createElement('div');
    shippingItem.className = 'summary-item';
    shippingItem.innerHTML = `
        <span>Shipping</span>
        <span>$${shipping.toFixed(2)}</span>
    `;
    
    orderSummary.insertBefore(shippingItem, summaryTotal);
    
    // Add tax
    const taxItem = document.createElement('div');
    taxItem.className = 'summary-item';
    taxItem.innerHTML = `
        <span>Tax</span>
        <span>$${tax.toFixed(2)}</span>
    `;
    
    orderSummary.insertBefore(taxItem, summaryTotal);
    
    // Update total
    summaryTotal.innerHTML = `
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
    `;
}

/**
 * Show Error
 * @param {string} message - The error message to display
 */
function showError(message) {
    // Create error element
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = 'var(--danger)';
    error.style.padding = '0.5rem';
    error.style.marginBottom = '1rem';
    error.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
    error.style.borderRadius = 'var(--border-radius)';
    
    // Add to form
    const form = document.querySelector('.checkout-step.active form');
    if (form) {
        form.prepend(error);
        
        // Remove after 3 seconds
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
}
