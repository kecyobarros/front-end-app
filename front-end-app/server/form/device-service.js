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
    deviceFindById: function (id) {
        return deviceController.App.uriFindByUserId(id);
    }
});
