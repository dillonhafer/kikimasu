//chrome.pageAction.onClicked.addListener(function(tab) {
//  chrome.tabs.executeScript(null, {code:"var s =localStorage['pandora_status']; if(s==='enabled'){localStorage['pandora_status']='disabled';document.getElementsByClassName('pauseButton')[0].click();document.getElementsByClassName('playButton')[0].style['cssText']+='background-image: url(/img/player-controls/btn_play.png)'}; if(s==='disabled'){localStorage['pandora_status']='enabled';document.getElementsByClassName('playButton')[0].click();}"});
//});

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'www.pandora.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

