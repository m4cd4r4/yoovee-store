/**
 * YooVee - Image Modal
 * Minimalist Redesign
 */

document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.hero__main-image img, .hero__thumbnail img');

    if (!productImages || productImages.length === 0) return;

    const modal = document.getElementById('image-modal');
    const modalImg = modal ? modal.querySelector('.image-modal-content') : null;
    const closeBtn = modal ? modal.querySelector('.close-image-modal') : null;
    const prevBtn = modal ? modal.querySelector('.modal-prev') : null;
    const nextBtn = modal ? modal.querySelector('.modal-next') : null;

    if (!modal || !modalImg || !closeBtn || !prevBtn || !nextBtn) return;

    let currentImageIndex = 0;
    const imageUrls = Array.from(productImages).map(img => img.src);

    function openModal(index) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        modalImg.src = imageUrls[index];
        currentImageIndex = index;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex === 0) ? imageUrls.length - 1 : currentImageIndex - 1;
        modalImg.src = imageUrls[currentImageIndex];
    }

    function showNext() {
        currentImageIndex = (currentImageIndex === imageUrls.length - 1) ? 0 : currentImageIndex + 1;
        modalImg.src = imageUrls[currentImageIndex];
    }

    // Add click events to images
    productImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            openModal(index);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrev();
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNext();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex' || modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showPrev();
            else if (e.key === 'ArrowRight') showNext();
            else if (e.key === 'Escape') closeModal();
        }
    });

    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < 0) showNext();
            else showPrev();
        }
    }, { passive: true });
});
