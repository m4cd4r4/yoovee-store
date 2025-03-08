/**
 * YooVee® Premium Fingerless Gloves - SEO Enhancements
 * Version: 1.0
 * 
 * This script provides performance and SEO improvements for the YooVee website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize SEO and performance enhancements
    initLazyLoading();
    initImageOptimization();
    initStructuredData();
    initLocalBusiness();
    initPerformanceMetrics();
});

/**
 * Lazy Loading Functionality
 * Uses Intersection Observer to lazy load images as they come into viewport
 */
function initLazyLoading() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Replace src with data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    // Replace srcset with data-srcset if applicable
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    // Remove loading="lazy" to prevent double lazy loading
                    img.removeAttribute('loading');
                    
                    // Stop observing image
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        // Simply use the browser's native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
}

/**
 * Image Optimization
 * Uses modern image formats and dynamically serves appropriate sizes
 */
function initImageOptimization() {
    // Check if browser supports WebP format
    const supportsWebP = localStorage.getItem('supportsWebP');
    
    if (supportsWebP === null) {
        // Test WebP support
        const webpTest = new Image();
        webpTest.onload = function() {
            localStorage.setItem('supportsWebP', 'true');
            convertImagesToWebP();
        };
        webpTest.onerror = function() {
            localStorage.setItem('supportsWebP', 'false');
        };
        webpTest.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    } else if (supportsWebP === 'true') {
        convertImagesToWebP();
    }
    
    // Convert qualifying JPG/PNG images to WebP format
    function convertImagesToWebP() {
        const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
        
        images.forEach(img => {
            // Skip SVGs and GIFs
            if (!img.src.includes('.svg') && !img.src.includes('.gif')) {
                // Create WebP path
                const webpPath = img.src.substring(0, img.src.lastIndexOf('.')) + '.webp';
                
                // Create image object to test if WebP file exists
                const testImage = new Image();
                testImage.onload = function() {
                    img.src = webpPath;
                };
                
                // Set src to WebP version
                testImage.src = webpPath;
            }
        });
    }
    
    // Apply responsive image sizes based on viewport and layout
    addResponsiveImageSizes();
    
    function addResponsiveImageSizes() {
        // Find images that would benefit from srcset
        const eligibleImages = document.querySelectorAll('img:not([srcset])');
        
        eligibleImages.forEach(img => {
            // Skip small images and those that already have srcset
            if (img.width < 300 || img.hasAttribute('srcset')) return;
            
            const imgPath = img.src.substring(0, img.src.lastIndexOf('.'));
            const imgExt = img.src.substring(img.src.lastIndexOf('.'));
            
            // Build srcset if responsive versions exist
            const sizes = [300, 600, 900, 1200];
            let srcset = '';
            
            // Test if each size exists
            sizes.forEach(size => {
                const responsiveImg = new Image();
                responsiveImg.onload = function() {
                    srcset += `${imgPath}-${size}w${imgExt} ${size}w, `;
                    
                    // If this was the last size, set the srcset attribute
                    if (size === sizes[sizes.length - 1] && srcset !== '') {
                        img.setAttribute('srcset', srcset.trim());
                        img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
                    }
                };
                responsiveImg.src = `${imgPath}-${size}w${imgExt}`;
            });
        });
    }
}

/**
 * Structured Data Management
 * Dynamically updates structured data based on page interactions
 */
function initStructuredData() {
    // Update product schema with current information
    updateProductSchema();
    
    // Update schema when product options change
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', updateProductSchema);
    });
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', updateProductSchema);
    });
    
    function updateProductSchema() {
        // Get current product information
        const productSchema = document.querySelector('script[type="application/ld+json"]');
        if (!productSchema) return;
        
        const schemaData = JSON.parse(productSchema.innerHTML);
        
        // Update color
        const selectedColor = document.querySelector('.color-option.active');
        if (selectedColor) {
            const color = selectedColor.getAttribute('data-color');
            if (color) {
                schemaData.color = color;
            }
        }
        
        // Update size
        const selectedSize = document.querySelector('.size-option.active');
        if (selectedSize) {
            const size = selectedSize.getAttribute('data-size');
            if (size) {
                // Add or update size
                if (!schemaData.hasOwnProperty('size')) {
                    schemaData.size = size;
                } else {
                    schemaData.size = size;
                }
            }
        }
        
        // Update availability
        const addToCartButton = document.querySelector('.add-to-cart');
        if (addToCartButton && addToCartButton.disabled) {
            schemaData.offers.availability = "https://schema.org/OutOfStock";
        } else {
            schemaData.offers.availability = "https://schema.org/InStock";
        }
        
        // Update schema
        productSchema.innerHTML = JSON.stringify(schemaData);
    }
}

/**
 * Local Business Data
 * Enhances local business structured data with geolocation
 */
function initLocalBusiness() {
    // Add geolocation data to local business schema
    const businessSchema = document.querySelector('script[type="application/ld+json"]:last-child');
    if (!businessSchema) return;
    
    try {
        const schemaData = JSON.parse(businessSchema.innerHTML);
        
        // Only update if it's a local business type
        if (schemaData['@type'] === 'Store' || schemaData['@type'] === 'LocalBusiness') {
            // Add geo coordinates if not present
            if (!schemaData.hasOwnProperty('geo')) {
                // Sydney coordinates as an example
                schemaData.geo = {
                    "@type": "GeoCoordinates",
                    "latitude": "-33.8688",
                    "longitude": "151.2093"
                };
            }
            
            // Update schema
            businessSchema.innerHTML = JSON.stringify(schemaData);
        }
    } catch (e) {
        console.error('Error parsing local business schema:', e);
    }
}

/**
 * Performance Metrics Collection
 * Collects and reports performance metrics for SEO analysis
 */
function initPerformanceMetrics() {
    // Check if browser supports Performance API
    if (window.performance && window.performance.timing) {
        // Wait for window load
        window.addEventListener('load', function() {
            setTimeout(function() {
                // Calculate and report page load metrics
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                
                // Log performance data
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`DOM Ready Time: ${domReadyTime}ms`);
                
                // Send metrics to analytics if available
                if (window.gtag) {
                    gtag('event', 'timing_complete', {
                        'name': 'page_load',
                        'value': pageLoadTime,
                        'event_category': 'Performance'
                    });
                    
                    gtag('event', 'timing_complete', {
                        'name': 'dom_ready',
                        'value': domReadyTime,
                        'event_category': 'Performance'
                    });
                }
                
                // Report for Core Web Vitals if available
                if ('web-vitals' in window) {
                    import('https://unpkg.com/web-vitals@3.1.0/dist/web-vitals.attribution.js').then(({onCLS, onFID, onLCP}) => {
                        onCLS(console.log);
                        onFID(console.log);
                        onLCP(console.log);
                    });
                }
            }, 0);
        });
    }
}

/**
 * Lighthouse Optimizations
 * Additional optimizations targeting Lighthouse score improvements
 */
function initLighthouseOptimizations() {
    // Preconnect to domains
    addPreconnect('https://cdnjs.cloudflare.com');
    addPreconnect('https://www.googletagmanager.com');
    
    function addPreconnect(url) {
        if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = url;
            document.head.appendChild(link);
        }
    }
    
    // Add preload for critical resources
    const criticalResources = [
        {path: '/css/style.min.css', as: 'style'},
        {path: '/js/main.min.js', as: 'script'},
        {path: '/images/glove-1.jpg', as: 'image'}
    ];
    
    criticalResources.forEach(resource => {
        if (!document.querySelector(`link[rel="preload"][href="${resource.path}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.path;
            link.as = resource.as;
            document.head.appendChild(link);
        }
    });
}

// Initialize lighthouse optimizations
initLighthouseOptimizations();
