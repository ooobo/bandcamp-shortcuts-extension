/* global chrome */

chrome.extension.sendMessage({}, function() {

  var readyStateCheckInterval;

  readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      chrome.runtime.onMessage.addListener(routeCommand);
    }
  }, 100);

  function routeCommand(request) {
    switch(request.command) {
        case 'play-track':
          playTrack();
        break;
        case 'prev-track':
          prevTrack();
        break;
        case 'next-track':
          nextTrack();
        break;
    }
  }

  function playTrack() {
    $('.playbutton')[0].click();
  }
  function nextTrack() {
    var currentTrackRel = $('.current_track').attr('rel');
          var currentTrackNum = parseInt(currentTrackRel.substr(currentTrackRel.indexOf("=") + 1));
          var findString = '[rel="tracknum='+(currentTrackNum+1)+'"]';
          var nextTrack = $('.track_list.track_table').find(findString);
          if(nextTrack.length) {
            $(nextTrack).find('.play_status').click();
          } else {
            $('.track_list.track_table').find('[rel="tracknum=1"]').find('.play_status').click();
          }
  }
  function prevTrack() {
    var currentTrackRel = $('.current_track').attr('rel');
          var currentTrackNum = parseInt(currentTrackRel.substr(currentTrackRel.indexOf("=") + 1));
          var findString = '[rel="tracknum='+(currentTrackNum-1)+'"]';
          var nextTrack = $('.track_list.track_table').find(findString);
          if(nextTrack.length) {
            $(nextTrack).find('.play_status').click();
          } else {
            $('.play_status').last().click();
          }
  }

  });
