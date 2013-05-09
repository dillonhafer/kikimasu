// Initialize local storage variable
localStorage['pandora_status'] = 'enabled';
localStorage['pandora_started_at'] = 0;

// Initialize images
document.getElementsByClassName("playButton")[0].firstChild.style['cssText'] = "background:transparent !important;"
document.getElementsByClassName("pauseButton")[0].firstChild.style['cssText'] = "background:none !important;"
document.getElementsByClassName("playButton")[0].style['cssText'] = document.getElementsByClassName("playButton")[0].style['cssText']+"background-image:url(/img/splash_spinner.gif);"
document.getElementsByClassName("pauseButton")[0].style['cssText'] = document.getElementsByClassName("pauseButton")[0].style['cssText']+"background-image:url(/img/splash_spinner.gif);background-repeat:no-repeat;z-index:999999999"


function checkIfPlaying() {
  // Initialize timer
  var timer = parseInt(localStorage['pandora_started_at']);
  var remaining = document.getElementsByClassName("remainingTime")[0].innerHTML;
  var remaining_time = remaining.replace("-", "").replace(":","");  

  // Restart after four hours
  if (timer < 10) {
    // Start playing after page refresh
    document.getElementsByClassName("playButton")[0].click();
  } else if (timer > 14400 && remaining_time < 4) {
    window.location.reload();
  }

  // Check if pandora timed out
  if (document.getElementsByClassName("still_listening")[0] != undefined) {
    document.getElementsByClassName("still_listening")[0].click();
  }

  // Play if pandora is paused
  var status = localStorage['pandora_status'];
  if (status === 'enabled') {
    if (/display:\ block/.test(document.getElementsByClassName("playButton")[0].style['cssText'])) {
      document.getElementsByClassName("playButton")[0].click();
      document.getElementsByClassName("playButton")[0].firstChild.style['cssText'] = "background:transparent !important;"
      document.getElementsByClassName("pauseButton")[0].firstChild.style['cssText'] = "background:none !important;"
      document.getElementsByClassName("playButton")[0].style['cssText'] = document.getElementsByClassName("playButton")[0].style['cssText']+"background-image:url(/img/splash_spinner.gif);"
      document.getElementsByClassName("pauseButton")[0].style['cssText'] = document.getElementsByClassName("pauseButton")[0].style['cssText']+"background-image:url(/img/splash_spinner.gif);background-repeat:no-repeat;z-index:999999999"
    }
  }
  // Make sure url icon is set
  chrome.extension.sendRequest({}, function(response) {});

  // Increment started at timer  
  localStorage['pandora_started_at'] = timer + 1;
}

setInterval(checkIfPlaying, 1000);