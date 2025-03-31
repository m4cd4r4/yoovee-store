// Image Modal with Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Select images that should trigger the modal (product gallery only now)
    const productImages = document.querySelectorAll('.main-image img, .thumbnail img');
    
    // Exit if no product images found
    if (!productImages || productImages.length === 0) {
        console.warn('No product images found for image modal');
        return;
    }
    
    // Select the modal elements from the HTML
    const modal = document.getElementById('image-modal');
    const modalImg = modal.querySelector('.image-modal-content');
    const closeBtn = modal.querySelector('.close-image-modal');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    // Exit if modal elements aren't found
    if (!modal || !modalImg || !closeBtn || !prevBtn || !nextBtn) {
        console.error('Image modal elements not found in the HTML.');
        return;
    }
    
    let currentImageIndex = 0;
    // Create an array of image sources from the selected product images
    const imageUrls = Array.from(productImages).map(img => img.src);
    
    // Function to open modal with specific image
    function openModal(index) {
        modal.style.display = 'block';
        modalImg.src = imageUrls[index];
        currentImageIndex = index;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    // Add click event to all product images
    productImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            openModal(index);
        });
    });
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Navigation functionality
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
        modalImg.src = imageUrls[currentImageIndex];
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
        modalImg.src = imageUrls[currentImageIndex];
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
                modalImg.src = imageUrls[currentImageIndex];
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
                modalImg.src = imageUrls[currentImageIndex];
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    });
    
    // Touch swipe functionality for modal
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    modal.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - show next image
            currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
            modalImg.src = imageUrls[currentImageIndex];
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right - show previous image
            currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
            modalImg.src = imageUrls[currentImageIndex];
        }
    }
});
