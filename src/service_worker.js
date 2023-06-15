import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url && (tab.url == "https://aims.iith.ac.in/aims/" || tab.url == "https://aims.iith.ac.in/aims/login/loginHome")) {
        chrome.tabs.sendMessage(tabId, {message: "login", captcha: ""}, (response) => {
            if(response && response.message == "data") {
                predict(response.data, (captcha) => {
                  chrome.tabs.sendMessage(tabId, {message: "captcha", captcha: captcha});
                });
            }
        });
    }
})
window = globalThis;
const predict = (data, captcha) => {
    tf.loadLayersModel('Model/model.json').then(function(model) {
        model.predict(tf.tensor(data)).array().then(function(predictions) {
            const class_names = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k',
            'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F',
            'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            var text = "";
            for(var i=0; i<predictions.length; i++) {
                text += class_names[predictions[i].indexOf(Math.max(...predictions[i]))];
            }
            captcha(text);
        });
    });
}