const http = require('http');
const qs = require('querystring');
const port = 3000;

let html_body = String.raw`<html>
<body onload="init()">
<h1>Welcome to Tama-Yaru</h1>
<input type="text" id="filename"></input>
<button id="loadchar">enter filename</button>
<script>

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
    httpRequest.send('fileName=' + encodeURIComponent(fileName));
    httpRequest.send();
  }
function init() {
  document.getElementById("loadchar").onclick = makeRequest;
};
</script>
</body>
</html>
`;

const requestHandler = (request, response) => {
    console.log(request.url)
    if (request.method === 'POST' && request.url === '/test.html') {
	var body = '';
	request.on('data', function(chunk) {
	    body += chunk;
	});
	request.on('end', function() {
	    var data = qs.parse(body);
	    response.writeHead(200);
	    response.end(JSON.stringify(data));
	});
    } else {
	response.end(html_body);
    }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
	return console.log('something bad happened', err);
    }
    
    console.log(`server is listening on ${port}`);
});
