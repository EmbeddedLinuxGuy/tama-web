var httpRequest;
var filename;
var userinput = "2";

function displayContents() {
    try {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
	    if (httpRequest.status === 200) {
		let lines = httpRequest.responseText.split('\n');
		if (lines[1].slice(0, 18) == "Arrange your stats") {
		    //alert(userinput);
		    document.getElementById("next").onclick = function (e) {
			userinput = "str dex spi wis";
			xhr();
		    };
		};
		document.getElementById("log").innerHTML = lines.join('\n') + document.getElementById("log").innerHTML;
      } else {
        alert('There was a problem with the request.');
      }
    }
  } catch (e) {
    alert('Caught Exception: ' + e.description);
  }
}

var action = 'init';

function xhr(params) {
    if (params) {
	params += `&fileName=${encodeURIComponent(fileName)}`;
    } else {
	params = `fileName=${encodeURIComponent(fileName)}`;
    }
    params += `&userinput=${encodeURIComponent(userinput)}`;
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.overrideMimeType("text/plain");
    httpRequest.onreadystatechange = displayContents;
    let url = 'test-endpoint';
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(params);
}

// handler 
function makeRequest(event) { //, userinput) {
    fileName = document.getElementById("filename").value;
    let params = `action=${action}`;
    xhr(params);
    action = 'next';
    canvas.style.visibility = "visible";
    document.getElementById("startwidget").style.display = "none";
}


var canvas;
var ctx;

var init = function() {
    document.getElementById("next").style.visibility = "hidden";
    canvas = document.getElementById("canvas");
    canvas.style.visibility = "hidden";
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

    canvas.addEventListener('click', function(event) {
	// XXX is x 0-799 or 1-800?
	let x = event.pageX - canvas.offsetLeft;
	//let y = event.pageY - canvas.offsetTop;
	userinput = 1 + Math.floor(4 * x / canvas.width);
	xhr();
	document.getElementById("next").style.visibility = "visible";
	document.getElementById("next").onclick = function (event) {
	    xhr();
	};
	canvas.style.visibility = "hidden";
    }, false);

    document.getElementById("loadchar").onclick = makeRequest;
}
