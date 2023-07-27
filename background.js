chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      let url = new URL(details.url);
      if (url.hostname === 'api.onvista.de' && url.pathname.includes('/instruments/STOCK/') && url.pathname.includes('/chart_history') && url.searchParams.has('idNotation') && ((url.searchParams.has('resolution') && url.searchParams.has('startDate')) || url.searchParams.get('range') === 'D1')) {
        chrome.scripting.executeScript({
          target: {tabId: details.tabId},
          function: (url) => { window.postMessage({type: 'ONVISTA_API_REQUEST', url: url}, '*'); },
          args: [details.url]
        });
      }
    },
    {urls: ["<all_urls>"]}
  );
  