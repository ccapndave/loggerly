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