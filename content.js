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
      document.body.appendChild(overlay);

      let apiHeading = document.createElement('h2');
      apiHeading.style.color = 'white';
      apiHeading.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
      apiHeading.style.fontFamily = 'Arial, sans-serif';
      apiHeading.style.fontSize = '24px';
      apiHeading.innerText = 'OnVista API Request Detected';
      overlay.appendChild(apiHeading);

      let apiUrlText = document.createElement('p');
      apiUrlText.style.color = 'white';
      apiUrlText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
      apiUrlText.style.fontFamily = 'Arial, sans-serif';
      apiUrlText.style.fontSize = '18px';
      apiUrlText.innerText = event.data.url;
      overlay.appendChild(apiUrlText);

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

      let ppHeading = document.createElement('h2');
      ppHeading.style.color = 'white';
      ppHeading.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
      ppHeading.style.fontFamily = 'Arial, sans-serif';
      ppHeading.style.fontSize = '24px';
      ppHeading.innerText = 'Portfolio Performance Stock URL';
      overlay.appendChild(ppHeading);

      let ppUrl = event.data.url.replace(/(https:\/\/api.onvista.de\/api\/v1\/instruments\/.*)(chart_history\?)(.*)(idNotation=[0-9]*)(.*)/, '$1eod_history?$4&range=Y5&startDate=2020-01-01');
      let ppUrlText = document.createElement('p');
      ppUrlText.style.color = 'white';
      ppUrlText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
      ppUrlText.style.fontFamily = 'Arial, sans-serif';
      ppUrlText.style.fontSize = '18px';
      ppUrlText.innerText = ppUrl;
      overlay.appendChild(ppUrlText);

      let heading = document.createElement('h2');
      heading.style.position = 'absolute';
      heading.style.bottom = '50px';
      heading.style.left = '33%'; // Verschiebt die Überschrift etwas mehr in die Mitte
      heading.style.color = 'white';
      heading.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
      heading.style.fontFamily = 'Arial, sans-serif';
      heading.style.fontSize = '18px';
      heading.innerText = 'Sponsor Me';
      overlay.appendChild(heading);

      let linkContainer = document.createElement('div');
      linkContainer.style.position = 'absolute';
      linkContainer.style.bottom = '10px';
      linkContainer.style.left = '50%';
      linkContainer.style.transform = 'translateX(-50%)';
      linkContainer.style.display = 'flex';
      linkContainer.style.justifyContent = 'center';
      overlay.appendChild(linkContainer);

      let coffeeLink = document.createElement('a');
      coffeeLink.href = 'https://www.buymeacoffee.com/svenknoerzer';
      coffeeLink.target = '_blank'; // Öffnet den Link in einem neuen Fenster
      let coffeeIcon = document.createElement('img');
      coffeeIcon.src = 'https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg'; // Ersetzen Sie dies durch Ihre tatsächliche URL
      coffeeIcon.style.width = '150px';
      coffeeIcon.style.height = 'auto';
      coffeeLink.appendChild(coffeeIcon);
      linkContainer.appendChild(coffeeLink);

      let paypalLink = document.createElement('a');
      paypalLink.href = 'https://www.paypal.com/paypalme/svenknoerzer';
      paypalLink.target = '_blank'; // Öffnet den Link in einem neuen Fenster
      let paypalIcon = document.createElement('img');
      paypalIcon.src = 'https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png'; // Ersetzen Sie dies durch Ihre tatsächliche URL
      paypalIcon.style.width = '134px';
      paypalIcon.style.height = 'auto';
      paypalLink.appendChild(paypalIcon);
      linkContainer.appendChild(paypalLink);

      coffeeLink.style.marginRight = '10px'; // Fügt einen Abstand zwischen den Icons hinzu
  }
});
