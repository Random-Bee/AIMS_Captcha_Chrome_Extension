(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {message, captcha} = obj;
        if(message == "login") {
            getData((gData) => {
                response({message: "data", data: gData})
            });
        }
        else if(message == "captcha") {
            const captchaInput = document.getElementById("captcha");
            captchaInput.value = captcha;
        }
        return true;
    });
    const getBWImage = (url, callback) => {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            var array = [];
            for (var i = 0; i < data.length; i += 4) {
                var val = data[i]*0.2126 + data[i+1]*0.7152 + data[i+2]*0.0722;
                if(val>125) array.push([val]);
                else array.push([0]);
            }
            var arr = [];
            for(var i=0; i<array.length; i+=img.width) {
                arr.push(array.slice(i, i+img.width));
            }
            var data = [];
            for(var i=0; i<canvas.width; i+=canvas.width/5) {
                var temp = [];
                for(var j=0; j<canvas.height; j++) {
                    temp.push(arr[j].slice(i, i+canvas.width/5));
                }
                data.push(temp);
            }
            callback(data);
        }
    }
    const getData = (get_data) => {
        const captchaImage = document.getElementById("appCaptchaLoginImg");
        const captchURL = captchaImage.src;
        getBWImage(captchURL, (data) => {
            get_data(data);
        })
    };
})();