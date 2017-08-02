deviceController = {};

deviceController.Services = (function () {
    'use strict';

    function uriFindByUserId(id) {
        return Meteor.settings["URL_DEVICE_APP"] + "/api/device/user/" + id;
    }

    return {
        uriFindByUserId: uriFindByUserId
    };
} ());

deviceController.App = (function () {
    'use strict';

    function uriFindByUserId(id) {
        var url = deviceController.Services.uriFindByUserId(id);
        var device = HTTP.call('GET', url);
        return device.data;
    }

    return {
        uriFindByUserId: uriFindByUserId
    };
} ());

Meteor.methods({
    deviceFindByUserId: function (id) {
        var connectionID = this.connection.id;
        DeviceCollection.remove({sessionID: connectionID});
        var result = deviceController.App.uriFindByUserId(id);
        for (var k in result){
          var json = result[k];
          json.sessionID = connectionID;
          DeviceCollection.insert(json);
        }
    },
    removeDevices: function (connectionID){
      DeviceCollection.remove({sessionID: connectionID});
    },
});
