var settings = {
  // Retrieves the setting for enabling/disabling the extension
  kikiStatus: function() {
    return localStorage['kikimasu_status']
  },
  // Retrieves the seconds since page load
  startedAt: function() {
    return parseInt(localStorage['pandora_started_at'])
  },
  // Updates the seconds since page load
  updateStartedAt: function(time) {
    localStorage['pandora_started_at'] = time
  },
  // Manage plugin status
  // Sets status to disabled
  disable: function() {
    localStorage['kikimasu_status'] = 'disabled'
  },
  // Sets status to enabled
  enable: function() {
    localStorage['kikimasu_status'] = 'enabled'
  }
}

var kiki = {
  init: function() {
    // Initialize local storage variables
    localStorage['kikimasu_status'] = 'enabled'
    localStorage['pandora_started_at'] = 0
    kiki.settings = settings
    // Start the loop
    setInterval(kiki.ensurePlayback, 1000)
  },

  // Reloads the plugin.
  // Future may require more than a page reload.
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

  stillListeningPresent: function() {
    return Boolean(kiki.stillListeningButton() != undefined)
  },

  enabled: function() {
    return Boolean(kiki.settings.kikiStatus() === 'enabled')
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
    } else if (kiki.stillListeningPresent()) {
      console.log("Still listening needs to be clicked")
      kiki.stillListeningButton().click()
    }

    if (kiki.enabled() && kiki.paused()) {
      kiki.play()
    }
    kiki.updateTimer()
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.func) {
    case "pause":
      kiki.settings.disable()
      kiki.pause()
      break
    case "play":
      kiki.settings.enable()
      kiki.play()
      break
    }
  }
);
// Start the extension
kiki.init()
