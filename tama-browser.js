function alertContents() {
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  } catch (e) {
    alert('Caught Exception: ' + e.description);
  }
}

var action = 'init';

function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    let url = 'test.html';

    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let fileName = document.getElementById("filename").value;
    httpRequest.send(`fileName=${encodeURIComponent(fileName)}&action=${action}`);
    action = 'next';
    // alert('Action is now: ' + action);
}
var init  = function() {
document.getElementById("loadchar").onclick = makeRequest;
}
