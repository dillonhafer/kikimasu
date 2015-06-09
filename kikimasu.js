var settings = {
  kikiStatus: function() {
    return localStorage['kikimasu_status']
  },
  startedAt: function() {
    return parseInt(localStorage['pandora_started_at'])
  },
  updateStartedAt: function(time) {
    localStorage['pandora_started_at'] = time
  }
}

var kiki = {
  init: function() {
    // Initialize local storage variable
    console.warn("Loading kiki")
    localStorage['kikimasu_status'] = 'enabled'
    localStorage['pandora_started_at'] = 0
    kiki.settings = settings
    setInterval(kiki.ensurePlayback, 1000)
  },

  reload: function() {
    window.location.reload()
  },

  playButton: function() {
    return document.querySelector('.playButton')
  },

  pauseButton: function() {
    return document.querySelector('.pauseButton')
  },

  stillListeningButton: function() {
    return document.querySelector('.still_listening')
  },

  play: function() {
    kiki.playButton().click()
  },

  pause: function() {
    kiki.pauseButton().click()
  },

  recentlyReloaded: function() {
    return Boolean(kiki.setings.startedAt() < 10)
  },

  stillListeningPresent: function() {
    return Boolean(kiki.stillListeningButton() != undefined)
  },

  enabled: function() {
    return Boolean(kiki.settings.kikiStatus() === 'enabled')
  },

  disable: function() {
    localStorage['kikimasu_status'] = 'disabled';
  },

  paused: function() {
    var displayStyle = kiki.playButton().style['cssText']
    return Boolean(/display:\ block/.test(displayStyle))
  },

  remainingSeconds: function() {
    var remaining = document.querySelector('.remainingTime').innerHTML
    return parseInt(remaining.replace("-", "").replace(":",""))
  },

  needsReloaded: function() {
    var longRunTime = Boolean(kiki.settings.startedAt() > 3500)
    var endOfSong   = Boolean(kiki.remainingSeconds() < 4)
    return Boolean(longRunTime && endOfSong)
  },

  updateTimer: function() {
    kiki.settings.updateStartedAt(kiki.settings.startedAt() + 1)
  },

  ensurePlayback: function() {
    if (kiki.needsReloaded()) {
      kiki.reload()
    }

    if (kiki.stillListeningPresent()) {
      console.log("Still listening needs to be clicked")
      kiki.stillListeningButton().click()
    }

    if (kiki.enabled() && kiki.paused()) {
      kiki.play()
    }
    kiki.updateTimer()
  }
}

function checkIfPlaying() {
  // Initialize timer
  var timer = parseInt(localStorage['pandora_started_at']);
  var remaining = document.getElementsByClassName("remainingTime")[0].innerHTML;
  var remaining_time = remaining.replace("-", "").replace(":","");  

  // Restart after four hours
  if (timer < 10) {
    // Start playing after page refresh
    document.getElementsByClassName("playButton")[0].click();
  } else if (timer > 3500 && remaining_time < 4) {
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
     // document.getElementsByClassName("playButton")[0].firstChild.style['cssText'] = "background:transparent !important;"
     // document.getElementsByClassName("pauseButton")[0].firstChild.style['cssText'] = "background:none !important;"
      //document.getElementsByClassName("playButton")[0].style['cssText'] = document.getElementsByClassName("playButton")[0].style['cssText']+"background-image:url(/img/splash_spinner.gif);"
      //ocument.getElementsByClassName("pauseButton")[0].style['cssText'] = document.getElementsByClassName("pauseButton")[0].style['cssText']+"background-image:url(/img/splash_spinner.gif);background-repeat:no-repeat;z-index:999999999"
    }
  }

  // Increment started at timer  
  localStorage['pandora_started_at'] = timer + 1;
}

kiki.init()
