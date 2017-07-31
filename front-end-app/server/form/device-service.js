deviceController = {};

deviceController.Services = (function () {
    'use strict';

    function uriFindByUserId(id) {
        // console.log(Meteor.settings["URL_DEVICE_APP"] + "/api/device/user/" + id);
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
        // console.log(id);
        DeviceCollection.remove({});
        var result = deviceController.App.uriFindByUserId(id);
        for (var k in result){
          // console.log(result[k]);
          DeviceCollection.insert(result[k]);
        }
    }
});
