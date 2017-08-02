
Meteor.startup(() => {
  // code to run on server at startup
  Meteor.subscribe("users");
  Meteor.subscribe("devices");

  Meteor.call("getSessionId", function(err, id) {
       Session.set("sessionID", id);
  });

});
