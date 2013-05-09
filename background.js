// Load url icon
function onRequest(request, sender, sendResponse) {  
  chrome.pageAction.show(sender.tab.id);
  sendResponse({});
};

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {code:"var s =localStorage['pandora_status']; if(s==='enabled'){localStorage['pandora_status']='disabled';document.getElementsByClassName('pauseButton')[0].click();document.getElementsByClassName('playButton')[0].style['cssText']+='background-image: url(/img/player-controls/btn_play.png)'}; if(s==='disabled'){localStorage['pandora_status']='enabled';document.getElementsByClassName('playButton')[0].click();}"});
});

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);