var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
//	res.writeHead(200, {'Content-Type' : 'text/plain'});
//	res.write('Hello World');
//	res.end();\
	
	var q = url.parse('127.0.0.1:8081', true);
	fs.readFile(q, function(err, data) {
		if(err){
			res.writeHead(404, {'Content-Type' : 'text/html'});
			return res.end('404 Not Found');
		}
		res.writeHead(200, {'Content-Type' : 'image/jpg'});
		res.write(data);
		return res.end();
	});
}).listen(8088);
