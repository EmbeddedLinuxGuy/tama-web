const http = require('http');
const qs = require('querystring');
const tama = require('tama-yaru');
const port = 3000;
const fs =require("fs");

let html_body = fs.readFileSync("index.html");

const requestHandler = (request, response) => {
    console.log(request.url)
    if (request.method === 'POST') {
	var body = '';
	request.on('data', function(chunk) {
	    body += chunk;
	});
	request.on('end', function() {
	    var data = qs.parse(body);
	    console.log(JSON.stringify(data));
	    response.writeHead(200);
	    if (request.url === '/test.html') {
		if (data.action === 'init') {
		    console.log("Initializing character");
		    tama.init(response, data.fileName);
		}
		else {
//		    console.log("Next day!");
		    tama.handle(null, response);
		}
		response.end(JSON.stringify(data));
	    }
	});
    } else { // GET
	if (request.url === '/tama-browser.js') {
	    console.log("serving javascript");
	    response.end(fs.readFileSync("tama-browser.js"));
	} else {
	    console.log(request.url);
	    response.end(html_body);
	}
    }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
	return console.log('something bad happened', err);
    }
    
    console.log(`server is listening on ${port}`);
});
