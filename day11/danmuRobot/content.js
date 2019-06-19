function sendDanmu() {
  const btn = document.querySelector(".ChatSend-button"),
    textinput = document.querySelector(".ChatSend-txt");
  if (mode == "custom") {
    customArray = customText.split("@");
    textinput.value =
      customArray[Math.floor(Math.random() * customArray.length)];
  } else {
    if (mode == "last") {
      textinput.value =
        document.querySelector(".Barrage-list li:last-child .Barrage-content")
          .innerText || "";
    } else {
      let sendedText = document.querySelectorAll(".Barrage-content"),
        textArray = Array.prototype.slice.call(sendedText),
        randonText = textArray[Math.floor(Math.random() * textArray.length)];
      textinput.value = randonText.innerText;
    }
  }

  btn.click();
}

let mode;
let customText;
function autoSend() {
  let timer;
  let timeout = 3000;
  return function(request) {
    switch (request.type) {
      case "start": {
        clearInterval(timer);
        timer = setInterval(sendDanmu, timeout);
        break;
      }
      case "end": {
        clearInterval(timer);
        console.log("🏄");
        break;
      }
      case "mode": {
        mode = request.value;
        console.log(mode);
        break;
      }
      case "customText": {
        chrome.storage.sync.set({ customText: request.value }, function() {
          customText = request.value;
        });
        break;
      }
      case "timeout": {
        timeout = request.value * 1000;
        break;
      }
    }
  };
}

chrome.runtime.onMessage.addListener(autoSend());

//   return function(request) {
//     if (request.type == "start") {
//       clearInterval(timer);
//       timer = setInterval(sendDanmu, 1000);
//     } else {
//       clearInterval(timer);
//       alert(request.type);
//     }
//   };
// }
