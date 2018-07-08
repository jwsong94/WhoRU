var http = require("http");
port=8088;

module.exports = function(buzzer){
	var server = http.createServer(function(request, response){

		if(request.url=== '/trigger'&&request.method=='GET') {
			buzzer.writeSync(1);

			setTimeout(function() {
				buzzer.writeSync(0);
			}, 2000);

			response.writeHeader(200, {
				"Content-Type":"application/json",
				"Access-Control-Allow-Origin":"*"
			});
			response.write('{"status":true}');
			response.end();

		} else {

			response.writeHeader(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin":"*"
			});
			response.write('{"status":true}');
			response.end();
		}
	});

	server.listen(port);
	console.log("Server Running on" + port + ".\nLaunch http://localhost:" +port);
	return server;
}

