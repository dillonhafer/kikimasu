// Initialize local storage variable
localStorage['pandora_status'] = 'enabled';

function checkIfPlaying() {
  // Check if pandora timed out
  if (document.getElementsByClassName("still_listening")[0] != undefined) {
    document.getElementsByClassName("still_listening")[0].click();
  }

  // Play if pandora is paused
  var status = localStorage['pandora_status'];
  if (status === 'enabled') {
    if (document.getElementsByClassName("playButton")[0].style['cssText'] == 'display: block; ') {
      document.getElementsByClassName("playButton")[0].click();
    }
  }

  // Make sure url icon is set
  chrome.extension.sendRequest({}, function(response) {});
}

setInterval(checkIfPlaying, 1000);