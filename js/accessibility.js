/**
 * YooVee® Premium Fingerless Gloves - Accessibility JavaScript
 * Version: 1.0
 * 
 * This file contains JavaScript functions to enhance the accessibility of the website.
 */

document.addEventListener('DOMContentLoaded', function() {
    initSkipLink();
    initFaqAccessibility();
    initCarouselAccessibility();
    initColorOptionsAccessibility();
    initSizeOptionsAccessibility();
    initModalAccessibility();
});

/**
 * Initialize Skip Link functionality
 * Ensures the skip link works correctly by setting focus to the main content
 */
function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            
            // Remove tabindex after focus to avoid interfering with normal navigation
            setTimeout(function() {
                mainContent.removeAttribute('tabindex');
            }, 1000);
        });
    }
}

/**
 * Initialize FAQ Accordion Accessibility
 * Enhances the FAQ accordion with proper ARIA attributes and keyboard navigation
 */
function initFaqAccessibility() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Since these are now proper buttons, they automatically handle Enter and Space
        question.addEventListener('click', toggleFaqItem);
    });
    
    function toggleFaqItem() {
        const faqItem = this.closest('.faq-item');
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Update ARIA attributes
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle visibility
        if (isExpanded) {
            faqAnswer.setAttribute('hidden', '');
            this.querySelector('.faq-toggle i').className = 'fas fa-plus';
        } else {
            faqAnswer.removeAttribute('hidden');
            this.querySelector('.faq-toggle i').className = 'fas fa-minus';
        }
    }
}

/**
 * Initialize Carousel Accessibility
 * Enhances the carousel with proper ARIA attributes and keyboard navigation
 */
function initCarouselAccessibility() {
    const carousel = document.querySelector('.customer-photos-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.customer-photo-slide');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    // Add keyboard navigation for carousel controls
    if (prevButton && nextButton) {
        prevButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showPreviousSlide();
            }
        });
        
        nextButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showNextSlide();
            }
        });
    }
    
    // Add keyboard navigation and ARIA for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
            }
        });
        
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    function showSlide(index) {
        // Update slides
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-selected', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-selected', 'false');
            }
        });
        
        // Announce slide change to screen readers
        const liveRegion = document.getElementById('carousel-live-region');
        if (liveRegion) {
            liveRegion.textContent = `Showing slide ${index + 1} of ${slides.length}`;
        }
    }
    
    function showNextSlide() {
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function showPreviousSlide() {
        const currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Add live region for screen reader announcements
    if (!document.getElementById('carousel-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'carousel-live-region';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
    }
}

/**
 * Initialize Color Options Accessibility
 * Enhances the color options with proper ARIA attributes and keyboard navigation
 */
function initColorOptionsAccessibility() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        if (option.getAttribute('aria-disabled') !== 'true') {
            option.addEventListener('keydown', function(e) {
                // Enter or Space key
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectColorOption(this);
                }
            });
            
            option.addEventListener('click', function() {
                selectColorOption(this);
            });
        }
    });
    
    function selectColorOption(option) {
        // Skip if option is disabled
        if (option.classList.contains('out-of-stock')) return;
        
        // Update all options
        colorOptions.forEach(opt => {
            if (opt === option) {
                opt.classList.add('active');
                opt.setAttribute('aria-checked', 'true');
            } else {
                opt.classList.remove('active');
                opt.setAttribute('aria-checked', 'false');
            }
        });
        
        // Announce selection to screen readers
        const liveRegion = document.getElementById('options-live-region');
        if (liveRegion) {
            liveRegion.textContent = `Selected color: ${option.getAttribute('aria-label')}`;
        }
    }
}

/**
 * Initialize Size Options Accessibility
 * Enhances the size options with proper ARIA attributes and keyboard navigation
 */
function initSizeOptionsAccessibility() {
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        if (option.getAttribute('aria-disabled') !== 'true') {
            option.addEventListener('keydown', function(e) {
                // Enter or Space key
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectSizeOption(this);
                }
            });
            
            option.addEventListener('click', function() {
                selectSizeOption(this);
            });
        }
    });
    
    function selectSizeOption(option) {
        // Skip if option is disabled
        if (option.classList.contains('out-of-stock')) return;
        
        // Update all options
        sizeOptions.forEach(opt => {
            if (opt === option) {
                opt.classList.add('active');
                opt.setAttribute('aria-checked', 'true');
            } else {
                opt.classList.remove('active');
                opt.setAttribute('aria-checked', 'false');
            }
        });
        
        // Announce selection to screen readers
        const liveRegion = document.getElementById('options-live-region');
        if (liveRegion) {
            liveRegion.textContent = `Selected size: ${option.getAttribute('aria-label')}`;
        }
    }
    
    // Add live region for screen reader announcements if not already present
    if (!document.getElementById('options-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'options-live-region';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
    }
}

/**
 * Initialize Modal Accessibility
 * Enhances modals with proper focus management and keyboard navigation
 */
function initModalAccessibility() {
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Track the element that had focus before the modal was opened
    let previouslyFocusedElement;
    
    // Open modal and trap focus
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                // Store the element that had focus before opening the modal
                previouslyFocusedElement = document.activeElement;
                
                // Show modal
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                
                // Show overlay
                const overlay = document.getElementById('overlay');
                if (overlay) {
                    overlay.classList.add('active');
                }
                
                // Set focus to the first focusable element in the modal
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
                
                // Trap focus within the modal
                modal.addEventListener('keydown', trapFocus);
            }
        });
    });
    
    // Close modal and restore focus
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking on overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        });
    }
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    function closeModal(modal) {
        if (!modal) return;
        
        // Hide modal
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Hide overlay
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Remove focus trap
        modal.removeEventListener('keydown', trapFocus);
        
        // Restore focus to the element that had focus before the modal was opened
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }
    
    function trapFocus(e) {
        // If Tab key is pressed
        if (e.key === 'Tab') {
            const focusableElements = this.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // If Shift+Tab and focus is on first element, move to last element
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
            // If Tab and focus is on last element, move to first element
            else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

// Add a CSS class for screen reader only text
if (!document.getElementById('accessibility-styles')) {
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
}
