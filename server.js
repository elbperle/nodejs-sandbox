var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html", "X-FOO": "BAR" })
    response.end("<html><body>dies ist svenja</body></html>");
}).listen(1337);