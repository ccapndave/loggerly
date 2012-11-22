Logs = new Meteor.Collection("logs");

if (Meteor.isServer) {
    Meteor.publish("logs", function(options) {
        var fields = {};

        if (options.levels && options.levels !== undefined) {
            fields.level = { $in: options.levels };
        }

        if (options.searchTerm && options.searchTerm !== undefined) {
            fields.message = { $regex: ".*" + options.searchTerm + ".*", $options: "i" };
        }

        return Logs.find(fields, { sort: { "timestamp": -1 } });
    });
}

if (Meteor.isClient) {
    Meteor.autosubscribe(function() {
        Meteor.subscribe("logs", { levels: Session.get("selectedLevels"), searchTerm: Session.get("searchTerm") });
    });
}

/*
<deberg>so the pattern you want is to write a publish function on the server that takes a "page" parameter.
<deberg>Meteor.publish('messages', function (page) { return Messages.find({}, {limit: 100, skip: 100 * page}); });
<deberg>(something like that)
<deberg>and then on the client, keep the "current page" in a  Session variable and use Meteor.autosubscribe() to automatically subscribe to the right page of messages.
*/