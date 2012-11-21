/*Scribbles = {
    collection: new Meteor.Collection("scribbles"),

    getAllScribbles: function() {
        return Scribbles.collection.find({}, { fields: { moves: false } });
    },

    getCompletedScribbles: function() {
        return Scribbles.collection.find({ completed: true }, { fields: { moves: false } });
    },

    getScribble: function(scribbleId) {
        return Scribbles.collection.find({ _id: scribbleId });
    }

}

if (Meteor.isServer) {
    Meteor.publish("Scribbles.getAllScribbles", Scribbles.getAllScribbles);
    Meteor.publish("Scribbles.getCompletedScribbles", Scribbles.getCompletedScribbles);
    Meteor.publish("Scribbles.getScribble", Scribbles.getScribble);
}

if (Meteor.isClient) {
    Meteor.subscribe("Scribbles.getAllScribbles");
    Meteor.subscribe("Scribbles.getCompletedScribbles");
    Meteor.subscribe("Scribbles.getScribble", Session.get("currentScribbleId"));
}*/
Logs = {
    collection: new Meteor.Collection("logs"),

    addLog: function(timestamp, source, level, message) {
        return this.collection.insert({ timestamp: timestamp, source: source, level: level, message: message });
    },

    getLogs: function(options) {
        var fields = {};

        if (options.levels && options.levels !== undefined) {
            fields.level = { $in: options.levels };
        }

        if (options.searchTerm && options.searchTerm !== undefined) {
            fields.message = { $regex: ".*" + options.searchTerm + ".*", $options: "i" };
        }

        return Logs.collection.find(fields, { sort: { "timestamp": -1 } });
    }

}

if (Meteor.isServer) {
    Meteor.publish("Logs.getLogs", Logs.getLogs);
}

if (Meteor.isClient) {
    Meteor.autosubscribe(function() {
        Meteor.subscribe("Logs.getLogs", { levels: Session.get("selectedLevels"), searchTerm: Session.get("searchTerm") });
    });
}

/*
<deberg>so the pattern you want is to write a publish function on the server that takes a "page" parameter.
<deberg>Meteor.publish('messages', function (page) { return Messages.find({}, {limit: 100, skip: 100 * page}); });
<deberg>(something like that)
<deberg>and then on the client, keep the "current page" in a  Session variable and use Meteor.autosubscribe() to automatically subscribe to the right page of messages.
*/