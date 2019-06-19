document.addEventListener("DOMContentLoaded", function() {
  $(".btn-start").click(handleStart);
  $(".btn-end").click(handleEnd);
  $(".ipt-time").change(handleTimeout);
  $(".ipt-time").mousemove(handleTimeout);
  $("textarea").change(handleIuput);
  $(".mode-control input").change(handleMode);

  // document.querySelector("").addEventListener("click", handleStart);
  // document.querySelector(".btn-end").addEventListener("click", handleEnd);
  // document.querySelector(".ipt-time").addEventListener("click", handleTimeout);
  // document.querySelector("textarea").addEventListener("change", handleIuput);
  // document
  //   .querySelectorAll(".mode-control input")
  //   .forEach(mode => mode.addEventListener("change", handleMode));
  chrome.storage.sync.get(["customText"], function(result) {
    $("textarea").text(result.customText);
  });
});
function sendToContent(message) {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}
function handleStart() {
  sendToContent({ type: "start" });
}
function handleEnd() {
  document.documentElement.style.setProperty(`--period`, 1000000);
  sendToContent({ type: "end" });
}
function handleIuput(e) {
  sendToContent({
    type: "customText",
    value: e.target.value
  });
}
function handleTimeout(e) {
  document.documentElement.style.setProperty(`--period`, e.target.value);
  $(".time span")[0].innerText = e.target.value + "s";
  sendToContent({
    type: "timeout",
    value: e.target.value
  });
}
function handleMode(e) {
  const textarea = document.querySelector("textarea");
  if (document.querySelector("input").checked) {
    textarea.style.display = "block";
    setTimeout(() => (textarea.style.maxHeight = "200px"), 100);
  } else {
    textarea.style.maxHeight = "0px";
    setTimeout(() => (textarea.style.display = "none"), 100);
  }
  sendToContent({
    type: "mode",
    value: e.target.value
  });
}
