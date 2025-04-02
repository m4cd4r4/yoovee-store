/**
 * YooVee® Premium Fingerless Gloves - Main JavaScript
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initFaqAccordion();
    // initCartSidebar(); // Functionality moved to cart.js
    initCheckoutModal();
    initSmoothScroll();
    initHeaderScroll();
    initFooterPopups();
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
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('.faq-toggle i');

        if (!question || !answer || !icon) return; // Ensure elements exist

        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other items first (optional, for accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('.faq-toggle i');

                    if (otherQuestion.getAttribute('aria-expanded') === 'true') {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.hidden = true;
                        otherItem.classList.remove('active'); // Optional: remove active class if used for styling
                        otherIcon.className = 'fas fa-plus';
                    }
                }
            });

            // Toggle the current item
            if (isExpanded) {
                // Close the current item
                this.setAttribute('aria-expanded', 'false');
                answer.hidden = true;
                item.classList.remove('active'); // Optional
                icon.className = 'fas fa-plus';
            } else {
                // Open the current item
                this.setAttribute('aria-expanded', 'true');
                answer.hidden = false;
                item.classList.add('active'); // Optional
                icon.className = 'fas fa-minus';
            }
        });
    });
}

/**
 * Cart Sidebar Functionality
 * Note: This functionality has been moved to cart.js
 */
// Removed initCartSidebar function as it's handled in cart.js

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
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Cart Functionality
 * Note: This functionality has been moved to cart.js
 */
// The Cart class has been moved to cart.js

function initFooterPopups() {
    // First, create a modal template for the popups
    const popupModal = document.createElement('div');
    popupModal.className = 'footer-popup-modal';
    
    popupModal.innerHTML = `
        <div class="popup-header">
            <h2 class="popup-title"></h2>
            <span class="close-popup">&times;</span>
        </div>
        <div class="popup-content"></div>
    `;
    
    document.body.appendChild(popupModal);
    
    // Create overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'footer-popup-overlay';
    
    document.body.appendChild(popupOverlay);

    // Get popup elements once
    const modal = document.querySelector('.footer-popup-modal');
    const overlay = document.querySelector('.footer-popup-overlay');
    const title = modal.querySelector('.popup-title');
    const content = modal.querySelector('.popup-content');
    const closeBtn = modal.querySelector('.close-popup');

    // Function to close popup
    function closePopup() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        // Remove the keydown listener when closing
        document.removeEventListener('keydown', handleEscKey);
    }

    // Function to handle Escape key
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    }

    // Add close listeners once
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    
    // Define popup content for each footer link
    const popupContents = {
        // // Company section - NOTE: This content is commented out. If links exist, they won't work.
        // "About Us": {
        //     title: "About YooVee®",
        //     content: `
        //         <p>YooVee® was founded in 2022 by a team of ergonomic specialists and textile engineers with a shared vision: to create premium fingerless gloves that provide unparalleled comfort and support without sacrificing dexterity.</p>
        //         <p>Our mission is to help people maintain hand health while enjoying unrestricted movement for all their daily activities, from office work to creative pursuits to outdoor adventures.</p>
        //         <p>Based in Sydney, Australia, YooVee® has quickly become a trusted name in ergonomic accessories, with customers worldwide appreciating our commitment to quality, sustainability, and functional design.</p>
        //         <p>Our signature fingerless gloves combine cutting-edge materials with thoughtful construction to deliver products that truly make a difference in people's lives. We're proud of our innovative approach and dedication to continuous improvement.</p>
        //         <p>At YooVee®, we believe that comfort should never compromise functionality. Every product we create reflects this philosophy, resulting in fingerless gloves that people love to wear day after day.</p>
        //     `
        // },
        // "Our Story": {
        //     title: "The YooVee® Story",
        //     content: `
        //         <p>The YooVee® journey began when our founder, Sarah Chen, experienced persistent wrist pain while working long hours as a graphic designer. Traditional wrist supports were bulky and restrictive, while conventional fingerless gloves lacked proper support.</p>
        //         <p>Sarah partnered with ergonomics expert Dr. James Wilson and textile engineer Maria Rodriguez to develop a solution. After 18 months of research, prototyping, and testing, the first YooVee® Premium Fingerless Gloves were born.</p>
        //         <p>Our early adopters included digital artists, musicians, programmers, and office workers - all reporting significant improvements in comfort and reduced pain. Word spread quickly, and soon we were shipping worldwide.</p>
        //         <p>In 2023, YooVee® expanded its product line to include specialized versions for different activities and needs. Our team has grown, but our commitment to quality and innovation remains unwavering.</p>
        //         <p>Today, YooVee® continues to push the boundaries of what fingerless gloves can offer, with new materials, designs, and features being developed to serve our growing community of loyal customers.</p>
        //     `
        // },
        // "Careers": {
        //     title: "Join the YooVee® Team",
        //     content: `
        //         <p>At YooVee®, we're always looking for passionate individuals to join our growing team. We value creativity, innovation, and a genuine commitment to improving people's lives through thoughtful product design.</p>
        //         <p>Working at YooVee® means being part of a diverse, collaborative team that values work-life balance and professional growth. We offer competitive salaries, flexible working arrangements, and a supportive company culture.</p>
        //         <h3>Current Openings:</h3>
        //         <ul>
        //             <li><strong>Product Designer</strong> - Help us create the next generation of ergonomic fingerless gloves</li>
        //             <li><strong>Digital Marketing Specialist</strong> - Drive our online presence and connect with customers worldwide</li>
        //             <li><strong>Customer Experience Associate</strong> - Ensure our customers receive exceptional service and support</li>
        //         </ul>
        //         <p>Even if you don't see a position that matches your skills, we're always interested in hearing from talented individuals. Send your resume to careers@yoovee.com.au with a cover letter explaining why you'd be a great fit for our team.</p>
        //     `
        // },
        // "Press": {
        //     title: "YooVee® in the Press",
        //     content: `
        //         <div class="press-highlights">
        //             <div class="press-item">
        //                 <h3>"The Future of Hand Support" - Tech Innovations Monthly</h3>
        //                 <p>"YooVee® has reimagined what fingerless gloves can be, combining ergonomic support with unparalleled comfort. Their innovative approach sets a new standard for hand accessories."</p>
        //             </div>
        //             <div class="press-item">
        //                 <h3>"Must-Have Accessory for Digital Creatives" - Design Journal</h3>
        //                 <p>"These aren't your average fingerless gloves. YooVee® has created something truly special that addresses the needs of those who work with their hands all day. A game-changer for preventing repetitive strain injuries."</p>
        //             </div>
        //             <div class="press-item">
        //                 <h3>"Australian Innovation Gaining Global Recognition" - Business Weekly</h3>
        //                 <p>"From a small Sydney startup to international acclaim, YooVee® demonstrates how addressing a specific need with thoughtful design can lead to remarkable business growth."</p>
        //             </div>
        //         </div>
        //         <p>For press inquiries, please contact media@yoovee.com.au</p>
        //     `
        // },
        
        // Support section
        "Contact Us": {
            title: "Get in Touch",
            content: `
                <p>We're here to help with any questions, concerns, or feedback you might have about YooVee® products.</p>
                
                <h3>Customer Support</h3>
                <p>Email: support@yoovee.com.au<br>
                Phone: +61 2 8888 7777<br>
                Hours: Monday-Friday, 9am-5pm AEST</p>
                
                <h3>Wholesale Inquiries</h3>
                <p>Email: wholesale@yoovee.com.au<br>
                Phone: +61 2 8888 7788</p>
                
                <h3>Visit Us</h3>
                <p>YooVee® Headquarters<br>
                123 Innovation Way<br>
                Sydney, NSW 2000<br>
                Australia</p>
                
                <p>We aim to respond to all inquiries within 24 hours during business days.</p>
            `
        },
        "Shipping Info": {
            title: "Shipping Information",
            content: `
                <h3>Free Express Shipping Australia-wide</h3>
                <p>All orders within Australia qualify for free express shipping. Orders placed before 2pm AEST on business days are typically dispatched the same day.</p>
                
                <h3>Estimated Delivery Times</h3>
                <ul>
                    <li><strong>Sydney Metro:</strong> 1-2 business days</li>
                    <li><strong>Other Australian Metro Areas:</strong> 2-3 business days</li>
                    <li><strong>Regional Australia:</strong> 3-5 business days</li>
                    <li><strong>International:</strong> 7-14 business days (varies by location)</li>
                </ul>
                
                <h3>International Shipping</h3>
                <p>We ship worldwide! International shipping rates are calculated at checkout based on destination and package weight. All applicable customs fees, duties, and taxes are the responsibility of the customer and are not included in the shipping cost.</p>
                
                <h3>Tracking Your Order</h3>
                <p>A tracking number will be provided via email once your order has been dispatched. You can use this number to monitor your delivery's progress.</p>
                
                <h3>Questions?</h3>
                <p>If you have any questions about shipping or delivery, please contact our customer support team at support@yoovee.com.au.</p>
            `
        },
        "Returns": {
            title: "Returns & Exchanges",
            content: `
                <h3>30-Day Satisfaction Guarantee</h3>
                <p>We stand behind the quality of our products. If you're not completely satisfied with your purchase, you may return it within 30 days of receipt for a full refund or exchange.</p>
                
                <h3>Return Process</h3>
                <ol>
                    <li>Contact our customer support team at returns@yoovee.com.au to request a return authorization.</li>
                    <li>Package the unused, unwashed item in its original packaging with all tags attached.</li>
                    <li>Include your order number and return authorization in the package.</li>
                    <li>Ship the package to the address provided by our customer support team.</li>
                </ol>
                
                <h3>Refund Policy</h3>
                <p>Once we receive and inspect your return, we'll process your refund within 5 business days. Refunds will be issued to the original payment method.</p>
                
                <h3>Exchanges</h3>
                <p>If you'd like to exchange your item for a different size or color, please indicate this in your return request. We'll process the exchange as soon as we receive your returned item.</p>
                
                <h3>Damaged or Defective Items</h3>
                <p>If you receive a damaged or defective item, please contact us immediately at support@yoovee.com.au with photos of the damage. We'll arrange for a replacement or refund at no additional cost to you.</p>
            `
        },
        "Size Guide": {
            title: "YooVee® Size Guide",
            content: `
                <p>Finding the right size is essential for optimal comfort and support. Follow these guidelines to determine your perfect fit.</p>
                
                <h3>How to Measure</h3>
                <p>To find your glove size, measure the circumference of your hand at its widest point (excluding the thumb) using a soft measuring tape.</p>
                
                <h3>Size Chart</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background-color: #f5f5f5; border-bottom: 1px solid #ddd;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Size</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Hand Circumference</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Best For</th>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; border: 1px solid #ddd;">Small (S)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">7-7.5 inches (17.5-19 cm)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">Smaller hands, typically women's XS-S</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; border: 1px solid #ddd;">Medium (M)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">7.5-8 inches (19-20.5 cm)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">Average women's or smaller men's hands</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; border: 1px solid #ddd;">Large (L)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">8-8.5 inches (20.5-22 cm)</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">Larger women's or average men's hands</td>
                    </tr>
                </table>
                
                <h3>Between Sizes?</h3>
                <p>If you're between sizes, we recommend sizing up for a more comfortable fit. Our gloves have some stretch, but they should not feel tight or restrictive.</p>
                
                <h3>Still Unsure?</h3>
                <p>Contact our customer support team at support@yoovee.com.au with your measurements, and we'll help you find the perfect size.</p>
            `
        },
        
        // Legal section
        "Terms of Service": {
            title: "Terms of Service",
            content: `
                <p><em>Last Updated: March 1, 2025</em></p>
                
                <p>Welcome to YooVee®. These Terms of Service ("Terms") govern your use of our website, products, and services.</p>
                
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing or using our website, purchasing our products, or using our services, you agree to be bound by these Terms and our Privacy Policy.</p>
                
                <h3>2. Products and Pricing</h3>
                <p>All products are subject to availability. We reserve the right to discontinue any product at any time and to limit quantities of any products that we offer.</p>
                <p>Prices for our products are subject to change without notice. We shall not be liable to you or any third party for any modification, price change, or discontinuance of any product.</p>
                
                <h3>3. Order Acceptance and Fulfillment</h3>
                <p>Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order. We reserve the right to accept or decline your order for any reason.</p>
                
                <h3>4. Shipping and Delivery</h3>
                <p>Delivery times are estimates only. We are not responsible for delays beyond our control, including but not limited to carrier delays, weather events, or natural disasters.</p>
                
                <h3>5. Returns and Refunds</h3>
                <p>Please refer to our Returns Policy for information about returns, exchanges, and refunds.</p>
                
                <h3>6. Intellectual Property</h3>
                <p>All content included on our website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the website, is the property of YooVee® or its suppliers and protected by copyright and other laws.</p>
                
                <p>This is a simplified version of our Terms of Service. For the complete terms, please contact legal@yoovee.com.au.</p>
            `
        },
        "Privacy Policy": {
            title: "Privacy Policy",
            content: `
                <p><em>Last Updated: March 1, 2025</em></p>
                
                <p>At YooVee®, we respect your privacy and are committed to protecting your personal data.</p>
                
                <h3>1. Information We Collect</h3>
                <p>We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
                <ul>
                    <li>Identity Data: name, username, or similar identifier</li>
                    <li>Contact Data: billing address, delivery address, email address, phone number</li>
                    <li>Financial Data: payment card details (securely processed through our payment providers)</li>
                    <li>Transaction Data: details about payments to and from you, and products you've purchased</li>
                    <li>Technical Data: internet protocol (IP) address, browser type and version, time zone setting</li>
                    <li>Usage Data: information about how you use our website and products</li>
                </ul>
                
                <h3>2. How We Use Your Information</h3>
                <p>We use your personal data for purposes including:</p>
                <ul>
                    <li>Processing and delivering your orders</li>
                    <li>Managing payments, fees, and charges</li>
                    <li>Communicating with you about your order or our products</li>
                    <li>Improving our website, products, and services</li>
                </ul>
                
                <h3>3. Data Security</h3>
                <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
                
                <h3>4. Data Retention</h3>
                <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for.</p>
                
                <h3>5. Your Legal Rights</h3>
                <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct, erase, restrict, or object to processing of your personal data.</p>
                
                <p>This is a simplified version of our Privacy Policy. For the complete policy, please contact privacy@yoovee.com.au.</p>
            `
        },
        "Accessibility": {
            title: "Accessibility Statement",
            content: `
                <p>YooVee® is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
                
                <h3>Our Approach</h3>
                <p>We strive to conform to level AA of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content accessible to people with a wide array of disabilities.</p>
                
                <h3>Measures Taken</h3>
                <ul>
                    <li>Providing clear navigation mechanisms</li>
                    <li>Ensuring sufficient color contrast</li>
                    <li>Supporting keyboard navigation</li>
                    <li>Including alternative text for images</li>
                    <li>Creating accessible forms with clear labels</li>
                    <li>Maintaining a consistent and predictable layout</li>
                </ul>
                
                <h3>Continuous Improvement</h3>
                <p>We welcome feedback on the accessibility of our website. If you encounter barriers or have suggestions for improvement, please contact us at accessibility@yoovee.com.au.</p>
                
                <h3>This Statement</h3>
                <p>This statement was created on March 1, 2025, and will be reviewed and updated regularly as part of our commitment to digital inclusion.</p>
            `
        },
        "Cookie Policy": {
            title: "Cookie Policy",
            content: `
                <p><em>Last Updated: March 1, 2025</em></p>
                
                <h3>What Are Cookies?</h3>
                <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
                
                <h3>How We Use Cookies</h3>
                <p>We use cookies for the following purposes:</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off.</li>
                    <li><strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count visitors and see how they move around our website.</li>
                    <li><strong>Functionality Cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
                    <li><strong>Targeting Cookies:</strong> These record your visit to our website, the pages you visit, and the links you follow.</li>
                </ul>
                
                <h3>Managing Cookies</h3>
                <p>Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser.</p>
                
                <h3>Third-Party Cookies</h3>
                <p>We also use cookies provided by trusted third parties, including Google Analytics, to help us understand how visitors use our website.</p>
                
                <h3>Changes to This Cookie Policy</h3>
                <p>We may update this Cookie Policy from time to time to reflect changes in technology, our business, or legal requirements.</p>
                
                <p>For more information about how we use cookies, please contact privacy@yoovee.com.au.</p>
            `
        }
    };
    
    // Get all footer links
    const footerLinks = document.querySelectorAll('.footer-column ul li a');
    
    // Add click event to footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const linkText = this.textContent.trim();
            
            // Check if we have content for this link
            if (popupContents[linkText]) {
                // Update popup content using the elements fetched earlier
                title.textContent = popupContents[linkText].title;
                content.innerHTML = popupContents[linkText].content;
                
                // Show popup
                modal.style.display = 'block';
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling

                // Add ESC key listener only when popup is open
                document.addEventListener('keydown', handleEscKey);
            } else {
                console.warn(`No popup content defined for footer link: "${linkText}"`);
            }
        });
    });

    // Note: The closePopup and handleEscKey functions are defined earlier now.
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
