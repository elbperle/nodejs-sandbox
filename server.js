var http = require("http");
var fs = require('fs');

http.createServer(function(request, response) {
    if (request.url === "/favicon.ico") {
        response.writeHead(404, {});
        response.end();
        return;
    }
    
    response.writeHead(200, { "Content-Type": "text/html", "X-FOO": "BAR" });  
    var filename = 'counter.txt';  
    readFile(filename, function(counter) {
        counter++;
        writeFile(filename, counter, function() {
            response.end("<html><body>" + counter + "</body></html>");
        })
    });
}).listen(1337);

function readFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) throw err;
        callback(parseInt(data));
    }); 
}

function writeFile(filename, data, callback) {
    fs.writeFile(filename, data, function (err) {
        if (err) throw err;
        callback();
    });
}