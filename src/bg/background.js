chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({
    url: "*://*.bandcamp.com/*", 
    active: true, 
    lastFocusedWindow: true,
    status: "complete"
  }, function(tabs) {
    if (!tabs || !tabs.length) return;
    return chrome.tabs.sendMessage(tabs[0].id, { command: command });
  });  
});
