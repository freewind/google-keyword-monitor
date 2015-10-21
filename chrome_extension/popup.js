var console = chrome.extension.getBackgroundPage().console;

var keywords = chrome.extension.getBackgroundPage().keywords;

console.log(JSON.stringify(keywords));

console.log($);

console.log($(document).find("#keywords"));

var keywordsElement = $(document).find("#keywords")

keywordsElement.html("");

_.each(keywords, function(value, key) {
  keywordsElement.append("<li>"+key + ":" + value + "</li>");
})
