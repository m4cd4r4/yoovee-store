// Image Modal with Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Product gallery modal functionality
    const productImages = document.querySelectorAll('.main-image img, .thumbnail img, .carousel-photo');
    
    // Exit if no product images found
    if (!productImages || productImages.length === 0) {
        console.warn('No product images found for image modal');
        return;
    }
    
    // Check if modal already exists
    let modal = document.querySelector('.image-modal');
    
    // Create modal if it doesn't exist
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="close-image-modal">&times;</span>
            <img class="image-modal-content">
            <div class="modal-nav modal-prev" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.4); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2001;">
                <i class="fas fa-chevron-left"></i>
            </div>
            <div class="modal-nav modal-next" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background-color: rgba(0, 0, 0, 0.4); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2001;">
                <i class="fas fa-chevron-right"></i>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const modalImg = modal.querySelector('.image-modal-content');
    const closeBtn = modal.querySelector('.close-image-modal');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    // Apply proper styling to the modal image
    modalImg.style.position = 'relative';
    modalImg.style.top = '50%';
    modalImg.style.transform = 'translateY(-50%)';
    modalImg.style.margin = 'auto';
    modalImg.style.display = 'block';
    modalImg.style.maxHeight = '80vh';
    modalImg.style.maxWidth = '80vw';
    modalImg.style.objectFit = 'contain';
    
    let currentImageIndex = 0;
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
