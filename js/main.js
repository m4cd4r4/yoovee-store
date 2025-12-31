/**
 * YooVee - Main JavaScript
 * Minimalist Redesign
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initAccordions();
    initSmoothScroll();
    initHeaderScroll();
    initFooterPopups();
    initScrollReveal();
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const toggle = document.querySelector('.header__menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.getElementById('overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (!toggle || !mobileNav) return;

    function openMenu() {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        mobileNav.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * Accordions (Details & FAQ)
 */
function initAccordions() {
    // Details accordion
    const detailsItems = document.querySelectorAll('.accordion-item');
    detailsItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');

            // Close all items
            detailsItems.forEach(i => {
                i.classList.remove('active');
                const t = i.querySelector('.accordion-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });

            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(i => {
                i.classList.remove('active');
                const q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            // Open clicked if it was closed
            if (!isOpen) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Smooth Scroll
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
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;

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

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Footer Popups
 */
function initFooterPopups() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'footer-popup-modal';
    modal.innerHTML = `
        <div class="popup-header">
            <h2 class="popup-title"></h2>
            <span class="close-popup">&times;</span>
        </div>
        <div class="popup-content"></div>
    `;
    document.body.appendChild(modal);

    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'footer-popup-overlay';
    document.body.appendChild(popupOverlay);

    const title = modal.querySelector('.popup-title');
    const content = modal.querySelector('.popup-content');
    const closeBtn = modal.querySelector('.close-popup');

    // Popup content
    const popupContents = {
        "Contact Us": {
            title: "Get in Touch",
            content: `
                <p>We're here to help with any questions about YooVee products.</p>
                <h3>Customer Support</h3>
                <p>Email: hello@yoovee.com.au</p>
                <p>We aim to respond to all inquiries within 24 hours during business days.</p>
            `
        },
        "Shipping Info": {
            title: "Shipping Information",
            content: `
                <h3>Complimentary Shipping Australia-wide</h3>
                <p>All orders within Australia qualify for free shipping.</p>
                <h3>Estimated Delivery Times</h3>
                <p>Metro Areas: 2-4 business days<br>Regional Areas: 4-7 business days</p>
                <h3>International Shipping</h3>
                <p>We ship worldwide. International rates are calculated at checkout. Customs fees and duties are the responsibility of the customer.</p>
            `
        },
        "Returns": {
            title: "Returns & Exchanges",
            content: `
                <h3>30-Day Satisfaction Guarantee</h3>
                <p>If you're not completely satisfied, return your unworn gloves within 30 days for a full refund.</p>
                <h3>Return Process</h3>
                <p>Contact us at hello@yoovee.com.au to request a return. We'll provide a free return shipping label for Australian orders.</p>
                <h3>Damaged Items</h3>
                <p>Received a damaged item? Contact us immediately with photos and we'll arrange a replacement at no cost.</p>
            `
        },
        "Size Guide": {
            title: "Size Guide",
            content: `
                <p>To find your size, measure the circumference of your hand at its widest point (excluding the thumb).</p>
                <h3>Size Chart</h3>
                <p><strong>Small (S):</strong> 18-19 cm<br>
                <strong>Large (L):</strong> 20.5-22 cm</p>
                <h3>Between Sizes?</h3>
                <p>If you're between sizes, we recommend sizing up for a more comfortable fit.</p>
            `
        },
        "Terms of Service": {
            title: "Terms of Service",
            content: `
                <p><em>Last Updated: January 2025</em></p>
                <p>By using our website or purchasing our products, you agree to these terms.</p>
                <h3>Products & Pricing</h3>
                <p>All products are subject to availability. We reserve the right to modify pricing without notice.</p>
                <h3>Intellectual Property</h3>
                <p>All content on this site is the property of YooVee and protected by copyright law.</p>
                <p>For complete terms, contact legal@yoovee.com.au</p>
            `
        },
        "Privacy Policy": {
            title: "Privacy Policy",
            content: `
                <p><em>Last Updated: January 2025</em></p>
                <p>We respect your privacy and are committed to protecting your personal data.</p>
                <h3>Information We Collect</h3>
                <p>Name, email, shipping address, and payment information for order processing.</p>
                <h3>How We Use Your Data</h3>
                <p>To process orders, communicate about your purchase, and improve our services.</p>
                <p>For complete policy, contact privacy@yoovee.com.au</p>
            `
        },
        "Accessibility": {
            title: "Accessibility",
            content: `
                <p>YooVee is committed to ensuring digital accessibility for all visitors.</p>
                <h3>Our Approach</h3>
                <p>We strive to meet WCAG 2.1 AA guidelines, including clear navigation, sufficient color contrast, keyboard accessibility, and alternative text for images.</p>
                <h3>Feedback</h3>
                <p>If you encounter barriers, please contact us at hello@yoovee.com.au</p>
            `
        }
    };

    function closePopup() {
        modal.style.display = 'none';
        popupOverlay.style.display = 'none';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscKey);
    }

    function handleEscKey(e) {
        if (e.key === 'Escape') closePopup();
    }

    closeBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);

    // Handle footer link clicks
    const footerLinks = document.querySelectorAll('.footer-popup-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const popupKey = this.getAttribute('data-popup');

            if (popupContents[popupKey]) {
                title.textContent = popupContents[popupKey].title;
                content.innerHTML = popupContents[popupKey].content;
                modal.style.display = 'block';
                popupOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.addEventListener('keydown', handleEscKey);
            }
        });
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.lifestyle__item, .testimonial, .accordion-item, .faq-item');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/**
 * Show Notification
 */
function showNotification(message) {
    let container = document.querySelector('.notification-container');

    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
