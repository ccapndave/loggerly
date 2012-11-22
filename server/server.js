// curl -d '{"level": "debug", "message": "hello" }' http://localhost:3000/log

Meteor.startup(function() {
    var doJsonResponse = function(response, statusCode, body) {
        response.statusCode = statusCode;
        response.setHeader('Content-Length', body.length);
        response.setHeader('Content-Type', 'application/json');
        response.write(body);
        response.end();
    };

    var requestListener = function(req, res, next) {
        var requestData = "";
        req.on('data', function(chunk) {
            requestData += chunk.toString();
        });

        req.on('end', function() {
            var jsonRequestData = JSON.parse(requestData);
            Fiber(function() {
                try {
                    jsonRequestData.timestamp = new Date().getTime();
                    jsonRequestData.source = req.headers["x-forwarded-for"];
                    Logs.insert(jsonRequestData);
                } catch (e) {
                    return doJsonResponse(res, 500, JSON.stringify({ error: e.toString(), success: false }));
                }
                return doJsonResponse(res, 200, JSON.stringify({ success: true }));
            }).run();
        });
    };

    __meteor_bootstrap__.app.stack.unshift({
        route: "/log",
        handle: requestListener
    });
});