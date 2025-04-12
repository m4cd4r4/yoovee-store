# YooVee® Premium Fingerless Gloves - E-commerce Website

![YooVee Logo](images/logo-header-transparent.svg)

A modern, responsive single-product e-commerce website for YooVee® Premium Fingerless Gloves, featuring a Node.js backend for Stripe payment processing.

## 📋 Overview

This project is a sophisticated, modern e-commerce website for YooVee® fingerless gloves that combines elegant aesthetics with robust functionality. The single-product store focuses on showcasing the premium fingerless gloves while guiding visitors through a seamless shopping experience, including secure online payments via Stripe.

## ✨ Features

- **Responsive Design:** Fully responsive layout that works on mobile, tablet, and desktop devices
- **Modern UI:** Clean, modern aesthetic with a color palette centered around gradient blues
- **Product Showcase:** Interactive product gallery with multiple views and an image modal for larger previews
- **Image Carousel:** Smooth carousel for browsing product images
- **Product Customization:** Color and size selection options
- **Shopping Cart:** Fully functional cart system with localStorage persistence
- **Secure Checkout:** Multi-step process integrated with Node.js backend for Stripe payments
- **Interactive Elements:** FAQ accordion, smooth scrolling, notifications, and more
- **Node.js Backend:** Express server to handle Stripe payment intent creation

## 🗂️ Project Structure

```
yoovee-store/
├── .env                # Environment variables (DO NOT COMMIT)
├── .gitignore          # Specifies intentionally untracked files for Git
├── css/
│   ├── cart.css        # Styles specific to the cart page
│   └── style.css       # Main stylesheet
├── fonts/              # Font files (if any)
├── images/
│   ├── favicon.png
│   ├── logo-header-transparent.svg
│   ├── yoovee_sunrise_babyBlue.png
│   ├── yoovee-logo-baby-blue.jpg
│   ├── yoovee-logo-black-svg.svg
│   ├── ai/             # AI-generated or related images
│   ├── Product/        # Product images (glove-1.jpg, glove-2.jpg, etc.)
│   ├── svg/            # SVG assets (patterns, logos)
│   └── webp/           # WebP images (customer photos)
├── js/
│   ├── carousel.js     # Logic for the image carousel
│   ├── cart.js         # Logic for the shopping cart page
│   ├── checkout.js     # Frontend logic for handling Stripe checkout elements
│   ├── image-modal.js  # Logic for the image preview modal
│   ├── main.js         # General site-wide JavaScript
│   └── product.js      # Logic specific to product selection/customization
├── node_modules/       # Node.js dependencies (created by npm install)
├── cart.html           # Shopping cart page
├── index.html          # Main landing/product page
├── package-lock.json   # Exact dependency versions
├── package.json        # Project metadata and dependencies
├── payment-success.html # Page shown after successful payment
├── README.md           # This file
└── server.js           # Node.js Express backend server for Stripe integration
```

## 🛠️ Technologies Used

### Frontend:
- HTML5
- CSS3 (with Flexbox and Grid layouts)
- JavaScript (ES6+)
- SVG for graphics
- Font Awesome for icons
- Local Storage for cart persistence

### Backend:
- Node.js
- Express.js
- Stripe API (for payment processing)
- dotenv (for environment variables)
- cors (for handling Cross-Origin Resource Sharing)

## 🚀 Getting Started

### Prerequisites:
- Node.js and npm (or yarn) installed
- A Stripe account and API keys (Secret Key)

### Setup:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/yoovee-store.git
   cd yoovee-store
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a file named `.env` in the root directory
   - Add your Stripe Secret Key:
     ```
     STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
     ```
     (Replace with your actual Stripe test key for development)

4. **Running the Application:**
   - Start the backend server:
     ```bash
     npm start
     ```
     This will run the server on http://localhost:4242 (or the port specified in .env)
   
   - Open the frontend by opening the `index.html` file directly in your web browser

## 🎨 Design Philosophy

The design language embraces a clean, modern aesthetic with a color palette centered around gradient blues (#87CEFA to #1E90FF) that reflect the YooVee® brand identity. The site employs ample white space, smooth transitions, and subtle animations to create a premium feel that matches the product's positioning.

## 🔍 Key Sections

- **Header & Navigation:** Fixed header with an SVG YooVee® logo
- **Hero Section:** Bold headline with a prominent call-to-action
- **Product Showcase:** Interactive product gallery with carousel, image modal, and customization options
- **Features Section:** Highlighting key product benefits
- **Testimonials:** Customer reviews with ratings
- **FAQ Section:** Interactive accordion-style questions and answers
- **Call-to-Action:** Compelling section encouraging purchase
- **Footer:** Company information and links
- **Cart Page:** Displays items added to the cart
- **Checkout Process:** Multi-step process using Stripe Elements
- **Payment Success Page:** Confirmation after successful payment

## 🌐 Browser Compatibility

The website is compatible with all modern browsers, including:
- Chrome
- Firefox
- Safari
- Edge

---

All rights reserved. YooVee® is a registered trademark.
