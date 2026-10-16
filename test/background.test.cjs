const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function load(){let handler,filter;const calls=[];const chrome={webRequest:{onBeforeRequest:{addListener:(callback,options)=>{handler=callback;filter=options;}}},scripting:{executeScript:value=>calls.push(value)}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../extension/background.js'),'utf8'),{chrome,URL});return {send:value=>handler(value),calls,filter};}
test('relocated service worker recognizes supported stock and fund history requests',()=>{
 const worker=load();
 for(const type of ['STOCK','FUND']){const url='https://api.onvista.de/api/v1/instruments/'+type+'/123/chart_history?idNotation=456&resolution=1D&startDate=2026-01-01';worker.send({url,tabId:12});assert.equal(worker.calls.at(-1).target.tabId,12);assert.equal(worker.calls.at(-1).args[0],url);}
 assert.equal(worker.calls.length,2);
 const daily='https://api.onvista.de/api/v1/instruments/STOCK/123/chart_history?idNotation=456&range=D1';worker.send({url:daily,tabId:12});assert.equal(worker.calls.length,3);
});
test('unrelated hosts, endpoints and missing parameters do not inject a script',()=>{
 const worker=load();
 for(const url of ['https://example.com/instruments/STOCK/123/chart_history?idNotation=456&range=D1','https://api.onvista.de/api/v1/instruments/STOCK/123/eod_history?idNotation=456&range=D1','https://api.onvista.de/api/v1/instruments/STOCK/123/chart_history?range=D1'])worker.send({url,tabId:12});
 assert.equal(worker.calls.length,0);
});
