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
	    if (request.url === '/test-endpoint') {
		if (data.action === 'init') {
		    console.log("Initializing character");
		    tama.init(response, data.fileName);
		} else {
		    //		    console.log("Next day!");
		    let userinput = data.userinput;
		    tama.handle(userinput, response);
		}
		response.end(JSON.stringify(data));
	    }
	});
    } else { // GET
	if (request.url === '/tama-browser.js') {
	    console.log("serving javascript");
	    response.end(fs.readFileSync("tama-browser.js"));
	} else if (request.url === '/1.jpg'
		   || request.url === '/2.jpg'
		   || request.url === '/3.jpg'
		   || request.url === '/4.jpg') {
	    response.end(fs.readFileSync(request.url.substring(1)));
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
