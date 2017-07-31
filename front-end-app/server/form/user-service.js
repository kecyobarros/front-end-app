userController = {};

userController.Services = (function () {
    'use strict';

    function uriFindPage(page) {
        console.log(Meteor.settings["URL_USER_APP"] + "/api/user/" + page);
        return Meteor.settings["URL_USER_APP"] + "/api/user/" + page;
    }

    function uriFindById(id) {
        return Meteor.settings["URL_USER_APP"] + "/api/user/id/" + id;
    }

    return {
        uriFindPage: uriFindPage,
        uriFindById: uriFindById
    };
} ());

userController.App = (function () {
    'use strict';

    function uriFindPage(page) {
        var url = userController.Services.uriFindPage(page);
        var user = HTTP.call('GET', url);
        return user.data;
    }

    function uriFindById(id) {
        var url = userController.Services.uriFindById(id);
        var user = HTTP.call('GET', url);
        return user.data;
    }

    return {
        uriFindPage: uriFindPage,
        uriFindById: uriFindById
    };
} ());

Meteor.methods({
    userFindPage: function (page) {
        UserCollection.remove({});
        var result = userController.App.uriFindPage(page);
        for (var k in result.content){
        //  console.log(result.content[k]);
          UserCollection.insert(result.content[k]);
        }
    },

    uriFindById: function (id) {
        return userController.App.uriFindById(company, structureId, json);
    }
});
