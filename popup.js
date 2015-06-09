var popup = {
  init: function() {
    popup.playButton().addEventListener('click', popup.play)
    popup.pauseButton().addEventListener('click', popup.pause)
  },

  kiki: function(func) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {func: func}, function(response) {})
    });
  },

  playButton: function() {
    return document.querySelector('#play-pandora')
  },

  pauseButton: function() {
    return document.querySelector('#pause-pandora')
  },

  pause: function() {
    popup.kiki('pause')
  },

  play: function() {
    popup.kiki('play')
  }
}

// Run the popup window
document.addEventListener('DOMContentLoaded', popup.init)

