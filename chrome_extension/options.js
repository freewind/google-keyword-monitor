var console = chrome.extension.getBackgroundPage().console;
var bgPage = chrome.extension.getBackgroundPage();

$(document).ready(function() {
	$("#my-name").val(bgPage.myName);
	$("#server-url").val(bgPage.serverUrl);
});

$("#save").click(function() {
	var myName = $("#my-name").val();
	var serverUrl = $("#server-url").val();
	if(myName && serverUrl) {
		bgPage.myName = myName;
		bgPage.serverUrl = serverUrl;
		alert("OK");
	} else {
		alert("'myName' or 'serverUrl' can't be empty");
	}
});
