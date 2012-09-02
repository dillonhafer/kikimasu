// Initialize local storage variable
localStorage['pandora_status'] = 'enabled';
localStorage['pandora_started_at'] = 0;

function checkIfPlaying() {
  // Initialize timer
  var timer = parseInt(localStorage['pandora_started_at']);
  
  // Restart after four hours
  if (timer < 10) {
    // Start playing after page refresh
    document.getElementsByClassName("playButton")[0].click();
  } else if (timer > 14400) {
    window.location.reload();
  }

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

  // Increment started at timer  
  localStorage['pandora_started_at'] = timer + 1;
}

setInterval(checkIfPlaying, 1000);