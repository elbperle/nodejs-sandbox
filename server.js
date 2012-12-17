var http = require("http");
var fs = require('fs');
var step = require("step");

http.createServer(function(request, response) {
    if (request.url === "/favicon.ico") {
        response.writeHead(404, {});
        response.end();
        return;
    }
    
    var filename = 'counter.txt';
    
    step (        
        function() {
            response.writeHead(200, { "Content-Type": "text/html", "X-FOO": "BAR" });
            return true;
        },
        
        function(err) {
            readFile(filename, this);            
        },
        
        function(err, counter) {
            counter++;
            return counter;
        },
        
        function(err, counter) {
            writeFile(filename, counter, this);            
        },
        
        function(err, counter) {
            response.end("<html><body>" + counter + "</body></html>");
        }
    );
    
}).listen(1337);

function readFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        callback(err, parseInt(data));
    }); 
}

function writeFile(filename, data, callback) {
    fs.writeFile(filename, data, function (err) {
        callback(err, data);
    });
}