var http = require('http');

var qs = require('querystring');

var util = require('util');

var events = require('events');

var content,options;

function Agent(hostOptions, post_data) {
    content = qs.stringify(post_data);
    options = hostOptions;
}



util.inherits(Agent, events.EventEmitter);

Agent.prototype.request = function() {
    var theRes;
    var that = this;
    var req = http.request(options, function(res) {
        theRes = res;
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
            that.emit("databack",chunk);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body  
    req.write(content);

    req.end();
    console.log("request end.-----------");
};




module.exports = Agent;