const http = require('http');
const port = 3000;

let html_body = String.raw`<html>
<body onload="init()">
<h1>Welcome to Tama-Yaru</h1>
<input type="text" id="entry"></input>
<button id="loadchar">enter filename</button>
<script>

function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
}

function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'test.html');
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
    if (request.url === "/test.html") {
	response.end("Hello, welcome to Tama Yaru");
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
