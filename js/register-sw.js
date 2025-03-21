/**
 * YooVee® Premium Fingerless Gloves - Service Worker Registration
 * Version: 1.0
 */

// Check if service workers are supported and we're not on file:// protocol
if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    // Use relative path to ensure it works in all environments
    const swPath = window.location.protocol === 'http:' || window.location.protocol === 'https:'
      ? './service-worker.js' 
      : 'service-worker.js';
      
    navigator.serviceWorker.register(swPath)
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Check for updates to the Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Service Worker update found!');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show notification to user
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
      
    // Handle controller change (when a new service worker takes over)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('New Service Worker controller');
    });
  });
}

/**
 * Show a notification to the user that an update is available
 */
function showUpdateNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'update-notification';
  notification.innerHTML = `
    <div class="update-notification-content">
      <p>A new version of this site is available!</p>
      <button class="btn btn-primary update-button">Update Now</button>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .update-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      padding: 15px;
      max-width: 300px;
    }
    
    .update-notification-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .update-notification p {
      margin: 0 0 10px;
      font-size: 14px;
    }
    
    .update-button {
      padding: 8px 16px;
      font-size: 14px;
    }
  `;
  
  // Add to document
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Add event listener to update button
  const updateButton = notification.querySelector('.update-button');
  updateButton.addEventListener('click', () => {
    // Send message to service worker to skip waiting
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    
    // Remove notification
    notification.remove();
    
    // Reload page to get new version
    window.location.reload();
  });
}
