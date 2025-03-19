# YooVee® Premium Fingerless Gloves - E-commerce Website

A modern, responsive single-product e-commerce website for YooVee® Premium Fingerless Gloves.

## Overview

This project is a sophisticated, modern e-commerce website for YooVee® fingerless gloves that combines elegant aesthetics with robust functionality. The single-product store puts the focus entirely on showcasing the premium fingerless gloves while guiding visitors through a seamless shopping experience.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Modern UI**: Clean, modern aesthetic with a color palette centered around gradient blues
- **Product Showcase**: Interactive product gallery with multiple views
- **Product Customization**: Color and size selection options
- **Shopping Cart**: Fully functional cart system with localStorage persistence
- **Checkout System**: Multi-step checkout process with form validation
- **Interactive Elements**: FAQ accordion, smooth scrolling, notifications, etc.
- **Accessibility Features**: Skip links, ARIA attributes, keyboard navigation, and high contrast options
- **PWA Support**: Offline functionality, installable on devices, and fast loading times
- **SEO Optimization**: Structured metadata, sitemap, and robots.txt for better search engine visibility
- **Image Optimization**: WebP format for faster loading and better performance

## Project Structure

```
yoovee-store/
├── index.html              # Main product page
├── cart.html               # Shopping cart page
├── offline.html            # Offline fallback page
├── manifest.json           # PWA manifest
├── service-worker.js       # PWA service worker
├── robots.txt              # SEO robots file
├── sitemap.xml             # SEO sitemap
├── css/
│   ├── style.css           # Main styles
│   ├── cart.css            # Cart-specific styles
│   └── accessibility.css   # Accessibility enhancements
├── js/
│   ├── main.js             # Core functionality
│   ├── product.js          # Product interaction logic
│   ├── checkout.js         # Checkout process
│   ├── cart.js             # Shopping cart functionality
│   ├── carousel.js         # Image carousel
│   ├── image-modal.js      # Product image modal
│   ├── accessibility.js    # Accessibility features
│   └── register-sw.js      # Service worker registration
└── images/
    ├── webp/               # WebP optimized images
    ├── svg/                # SVG graphics
    └── various image files
```

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid layouts)
- JavaScript (ES6+)
- SVG for graphics
- Font Awesome for icons
- Local Storage for cart persistence
- Progressive Web App (PWA) technologies
- WebP image format for optimization
- ARIA attributes for accessibility

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/m4cd4r4/yoovee-store.git
   ```

2. Open `index.html` in your web browser to view the website.

## Design Philosophy

The design language embraces a clean, modern aesthetic with a color palette centered around gradient blues (#87CEFA to #1E90FF) that reflect the YooVee® brand identity. The site employs ample white space, smooth transitions, and subtle animations to create a premium feel that matches the product's positioning.

## Key Sections

1. **Header & Navigation**: Fixed header with an SVG YooVee® logo featuring a custom gradient
2. **Hero Section**: Bold headline with a prominent call-to-action
3. **Product Showcase**: Interactive product gallery with customization options
4. **Skincare & Protection**: Information about hand care and protection
5. **Customer Reviews**: Photo carousel with customer feedback
6. **FAQ Section**: Interactive accordion-style questions and answers
7. **Call-to-Action**: Compelling section encouraging purchase
8. **Footer**: Company information and links
9. **Checkout System**: Multi-step checkout process

## Accessibility

The website is built with accessibility in mind, featuring:
- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support
- Skip links for easier navigation
- High contrast mode
- Text alternatives for images

## Progressive Web App

The site functions as a Progressive Web App (PWA) with:
- Offline functionality
- Fast loading times
- Installable on devices
- Responsive across all screen sizes
- Push notification capability

## Browser Compatibility

The website is compatible with all modern browsers, including:
- Chrome
- Firefox
- Safari
- Edge

## License

All rights reserved. YooVee® is a registered trademark.

m4cd4r4
