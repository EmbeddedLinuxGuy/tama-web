var httpRequest;

function displayContents() {
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
          document.getElementById("log").innerHTML = httpRequest.responseText + document.getElementById("log").innerHTML;
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
    httpRequest.onreadystatechange = displayContents;
    let url = 'test.html';

    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let fileName = document.getElementById("filename").value;
    httpRequest.send(`fileName=${encodeURIComponent(fileName)}&action=${action}`);
    action = 'next';
    // alert('Action is now: ' + action);
}
var canvas;
var ctx;

var init = function() {
    document.getElementById("loadchar").onclick = makeRequest;

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 200;

    var nums = [1, 2, 3, 4];
    nums.map(function (i) {
	let img = new Image();
	img.src = `${i}.jpg`;
	(function (imgarg, posarg) {
	    img.onload = () => ctx.drawImage(imgarg, posarg, 0);
	})(img, 200*(i-1));
    });

    canvas.addEventListener('click', function() {
	let x = event.pageX - canvas.offsetLeft;
	//let y = event.pageY - canvas.offsetTop;
	let selection = Math.floor(x / canvas.width);
	
    }, false);
}
