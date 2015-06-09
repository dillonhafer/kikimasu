var popup = {
  init: function() {
    popup.playButton().addEventListener('click', popup.play)
    popup.pauseButton().addEventListener('click', popup.pause)
    popup.kiki = chrome.extension.getBackgroundPage()
  },

  playButton: function() {
    return document.querySelector('#play-pandora')
  },

  pauseButton: function() {
    return document.querySelector('#pause-pandora')
  },

  pause: function() {
    popup.playButton().className = ''
    popup.pauseButton().className = 'hide'
    popup.kiki.disable()
  },

  play: function() {
    popup.playButton().className = 'hide'
    popup.pauseButton().className = ''
    localStorage['kikimasu_status'] = 'enabled';
  }
}

// Run the popup window
document.addEventListener('DOMContentLoaded', popup.init)

