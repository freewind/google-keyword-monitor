var console = chrome.extension.getBackgroundPage().console;

var myName = "";
var serverUrl = "";
var keywords = {};

function loadOptions() {
  chrome.storage.local.get('options', function(data) {
    var options = data.options;
    if(options) {
      myName = options.myName;
      serverUrl = options.serverUrl;
    }
  });
}

loadOptions();

function saveOptions(options) {
  myName = options.myName;
  serverUrl = options.serverUrl;
  chrome.storage.local.set({'options': {
    myName: myName,
    serverUrl: serverUrl
  }});
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if(details.method === 'GET') {
    var url = details.url;
    if(/.*\.google\.[^\/]+\/search\?.*/.test(url)) {
      console.log(url);
      var keywordGroup = url.match(/.*\bq=(.+?)(\&.*|$)/)
      if(keywordGroup) {
        var keyword = keywordGroup[1];
        if(keyword) {
          var realKeyword = decodeURIComponent(keyword.replace(/\+/g, ' '));
          if(keywords[realKeyword]) {
            keywords[realKeyword] += 1;
          } else {
            keywords[realKeyword] = 1;
          }
          console.log(realKeyword);
          $.post(serverUrl, {
            who: myName,
            searchEngine : "google",
            keyword : realKeyword,
            timestamp : moment().unix()
          }).error( function(xhr, textStatus, errorThrown) {
            alert("Can't post data to: " + serverUrl+ ", " + xhr.responseText);
          });
        }
      }
    }
  }

  // console.log(details.url);
}, {urls: ["<all_urls>"]}, []);
