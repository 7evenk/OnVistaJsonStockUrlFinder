let switchState = false;

let switchOverlay = document.createElement('div');
switchOverlay.style.position = 'fixed';
switchOverlay.style.right = '10px';
switchOverlay.style.top = '10px';
switchOverlay.style.width = '50px';
switchOverlay.style.height = '50px';
switchOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
switchOverlay.style.color = 'white';
switchOverlay.style.fontSize = '14px';
switchOverlay.style.padding = '5px';
switchOverlay.style.zIndex = '10000';
switchOverlay.style.borderRadius = '10px';
switchOverlay.style.textAlign = 'center';
switchOverlay.style.cursor = 'pointer';
switchOverlay.style.display = 'flex';
switchOverlay.style.justifyContent = 'center';
switchOverlay.style.alignItems = 'center';
switchOverlay.innerText = 'OFF';
document.body.appendChild(switchOverlay);

switchOverlay.addEventListener('click', function () {
  switchState = !switchState;
  switchOverlay.innerText = switchState ? 'ON' : 'OFF';
});

window.addEventListener('message', function (event) {
  if (event.data.type && event.data.type === 'ONVISTA_API_REQUEST' && switchState) {
    let url = event.data.url;

    let urlDate = null;
    try {
      urlDate = url.split("startDate=")[1].split("T")[0];
    } catch {
      urlDate = null;
    }

    let urlDateObj = null;
    if (!urlDate && url.includes("range=D1")) {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      urlDateObj = yesterday;
    } else {
      urlDateObj = new Date(urlDate);
    }

    let currentDate = new Date();

    let yearsDifference = currentDate.getFullYear() - urlDateObj.getFullYear();

    let range = "";
    let startDate = "";

    if (yearsDifference === 0) {
      let monthsDifference = currentDate.getMonth() - urlDateObj.getMonth();
      if (monthsDifference === 0) {
        currentDate.setHours(0, 0, 0, 0); // Nur Jahr Monat Tag berücksichtigen
        urlDateObj.setHours(0, 0, 0, 0);
        
        let weeksDifference = Math.floor((currentDate.getTime() - urlDateObj.getTime()) / (1000 * 60 * 60 * 24 * 7));
        if (weeksDifference === 0) {
          let daysDifference = Math.floor((currentDate.getTime() - urlDateObj.getTime()) / (1000 * 60 * 60 * 24));
          range = "D" + daysDifference;
          let today = new Date();
          let dayAgo = new Date();
          dayAgo.setDate(today.getDate() - 1);

          startDate = dayAgo.toISOString().split('T')[0];
        } else {
          range = "M" + weeksDifference; // Wx range dows not work in PP
          startDate = urlDate;
        }
      } else {
        range = "M" + monthsDifference;
        startDate = urlDate
      }
    } else {
      range = "Y" + yearsDifference;
      startDate = urlDate;
    }

    let ppUrl = event.data.url.replace(/(https:\/\/api.onvista.de\/api\/v1\/instruments\/.*)(chart_history\?)(.*)(idNotation=[0-9]*)(.*)/, '$1eod_history?$4&range=' + range + '&startDate=' + startDate);

    let existingOverlay = document.getElementById('overlay');
    if (existingOverlay) {
      document.body.removeChild(existingOverlay);
    }

    let template = `
      <div id="overlay" style="position: fixed; left: 25%; top: 25%; width: 50%; height: 50%; background-color: rgba(0, 0, 0, 0.8); color: white; font-size: 20px; padding: 20px; z-index: 10000; border-radius: 10px;">
      <h2 style="margin: 0; color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 24px;">onvista Json Stock Url Finder for Portfolio Performance</h2>  
      <button style="position: absolute; right: 10px; top: 10px; font-size: 20px; color: white; background-color: black; border: none; border-radius: 50%; width: 30px; height: 30px; text-align: center;" onclick="document.body.removeChild(this.parentNode);">X</button>
        
        <div style="height: 70%; overflow: auto; padding-right: 20px;margin-top: 20px;">

        
        <div>
          <div style="display: grid; grid-template-columns: 20% 70% 10%; padding-top: 10px;">
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Kurs URL: </span>
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px; text-align: center;">${ppUrl}</span>
            <button style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.color = 'black'; this.style.backgroundColor = 'white'; setTimeout(() => {this.style.color = 'white'; this.style.backgroundColor = 'black';}, 1000);">Copy</button>
          </div> 
          <div style="display: grid; grid-template-columns: 20% 70% 10%; padding-top: 10px;">
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Pfad zum Datum: </span>
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px; text-align: center;">$.datetimeLast[*]</span>
            <button style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.color = 'black'; this.style.backgroundColor = 'white'; setTimeout(() => {this.style.color = 'white'; this.style.backgroundColor = 'black';}, 1000);">Copy</button>
          </div> 
          <div style="display: grid; grid-template-columns: 20% 70% 10%; padding-top: 10px;">
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Pfad zum Kurs: </span>
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px; text-align: center;">$.last[*]</span>
            <button style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.color = 'black'; this.style.backgroundColor = 'white'; setTimeout(() => {this.style.color = 'white'; this.style.backgroundColor = 'black';}, 1000);">Copy</button>
          </div>
          <div style="display: grid; grid-template-columns: 20% 70% 10%; padding-top: 10px;">
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Pfad zum Tagestief: </span>
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px; text-align: center;">$.low[*]</span>
            <button style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.color = 'black'; this.style.backgroundColor = 'white'; setTimeout(() => {this.style.color = 'white'; this.style.backgroundColor = 'black';}, 1000);">Copy</button>
          </div>
          <div style="display: grid; grid-template-columns: 20% 70% 10%; padding-top: 10px;">
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Pfad zum Tageshoch: </span>
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px; text-align: center;">$.high[*]</span>
            <button style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.color = 'black'; this.style.backgroundColor = 'white'; setTimeout(() => {this.style.color = 'white'; this.style.backgroundColor = 'black';}, 1000);">Copy</button>
          </div>
          <div style="display: grid; grid-template-columns: 20% 70% 10%; padding-top: 10px;">
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Pfad zum Volumen: </span>
            <span style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px; text-align: center;">$.volume[*]</span>
            <button style="font-size: 20px; color: white; background-color: black; border: none; border-radius: 10px; text-align: center;" onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText); this.style.color = 'black'; this.style.backgroundColor = 'white'; setTimeout(() => {this.style.color = 'white'; this.style.backgroundColor = 'black';}, 1000);">Copy</button>
          </div>
      </div>
      
        <div>
          <div id="sponsorLinksContainer" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);">
            <div style="margin-left: -24px";>
              <h2 style="color: white; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; font-size: 18px;">Sponsor Me</h2>
            </div>
            <a href="https://www.buymeacoffee.com/svenknoerzer" target="_blank" style="margin-right: 10px;"><img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg" style="width: 150px; height: auto;"></a>
            <a href="https://www.paypal.com/paypalme/svenknoerzer" target="_blank"><img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png" style="width: 134px; height: auto;"></a>
          </div>
        </div>
      </div>
    `;

    let templateElement = document.createElement('template');
    templateElement.innerHTML = template.trim();
    document.body.appendChild(templateElement.content.firstChild);

    let overlay = document.getElementById('overlay');

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }
    });
  }
});
