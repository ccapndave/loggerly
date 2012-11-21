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

    getAllLogs: function(options) {
        var fields = {};

        if (options.levels && options.levels !== undefined) {
            fields.level = { $in: options.levels };
        }

        if (options.searchTerm && options.searchTerm !== undefined) {
            fields.message = { $regex: ".*" + options.searchTerm + ".*", $options: "i" };
        }

        return this.collection.find(fields, { sort: { "timestamp": -1 }});
    }

}