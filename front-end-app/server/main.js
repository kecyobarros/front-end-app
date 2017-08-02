import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("users", function(){
    return UserCollection.find({});
  });

  Meteor.publish("devices", function(){
    return DeviceCollection.find({});
  });

  Meteor.onConnection(function (conn) {
      conn.onClose(function () {
        Meteor.call('removeUsers', conn.id);
        Meteor.call('removeDevices', conn.id);
      });
  });

  Meteor.methods({
    getSessionId: function() {
      return this.connection.id;
    }
  });
});
