window.addEventListener('message', function(event) {
    if (event.data.type && event.data.type === 'ONVISTA_API_REQUEST') {
      let overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.left = '25%';
      overlay.style.top = '25%';
      overlay.style.width = '50%';
      overlay.style.height = '50%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.color = 'white';
      overlay.style.fontSize = '20px';
      overlay.style.padding = '20px';
      overlay.style.zIndex = '10000';
      overlay.style.border = '2px solid white';
      overlay.style.borderRadius = '10px';
      overlay.innerText = 'OnVista API Request Detected:\n\n' + event.data.url;
      document.body.appendChild(overlay);
  
      let closeButton = document.createElement('button');
      closeButton.style.position = 'absolute';
      closeButton.style.right = '10px';
      closeButton.style.top = '10px';
      closeButton.style.fontSize = '20px';
      closeButton.style.color = 'white';
      closeButton.style.backgroundColor = 'red';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '30px';
      closeButton.style.height = '30px';
      closeButton.style.textAlign = 'center';
      closeButton.innerText = 'X';
      overlay.appendChild(closeButton);
  
      closeButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
  
      window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }
      });
    }
  });
  