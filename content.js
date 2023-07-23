window.addEventListener('message', function (event) {
  if (event.data.type && event.data.type === 'ONVISTA_API_REQUEST') {
    let ppUrl = event.data.url.replace(/(https:\/\/api.onvista.de\/api\/v1\/instruments\/.*)(chart_history\?)(.*)(idNotation=[0-9]*)(.*)/, '$1eod_history?$4&range=Y5&startDate=2020-01-01');

    let template = `
      <div style="position: fixed; left: 25%; top: 25%; width: 50%; height: 50%; background-color: rgba(0, 0, 0, 0.8); color: white; font-size: 20px; padding: 20px; z-index: 10000; border: 2px solid white; border-radius: 10px; overflow: auto;">
        <button style="position: absolute; right: 10px; top: 10px; font-size: 20px; color: white; background-color: black; border: none; border-radius: 50%; width: 30px; height: 30px; text-align: center;" onclick="document.body.removeChild(this.parentNode);">X</button>
        <!--<div>
          <h2 style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 24px;">OnVista API Request Detected</h2>
          <div style="display: flex;">
            <p style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">${event.data.url}</p>
          </div>
        </div>-->
        <div>
          <h2 style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 24px;">Portfolio Performance Stock URL</h2>
          <div style="display: flex;">
            <p style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">${ppUrl}</p>
            <button id="copyButton" style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText('${ppUrl}'); this.style.backgroundColor = 'green'; setTimeout(() => this.style.backgroundColor = 'black', 1000);">Copy</button>
          </div>
        </div>
        <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);">
          <div style="margin-left: -24px";>
            <h2 style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Sponsor Me</h2>
          </div>
          <a href="https://www.buymeacoffee.com/svenknoerzer" target="_blank" style="margin-right: 10px;"><img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" style="width: 150px; height: auto;"></a>
          <a href="https://www.paypal.com/paypalme/svenknoerzer" target="_blank"><img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png" style="width: 134px; height: auto;"></a>
        </div>
      </div>
    `;

    let templateElement = document.createElement('template');
    templateElement.innerHTML = template.trim();
    document.body.appendChild(templateElement.content.firstChild);

    // Referenzieren Sie das Overlay-Element erneut
    let overlay = document.body.lastChild;

    // Fügen Sie den Event-Listener für die Escape-Taste hinzu
    window.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }
    });
  }
});
