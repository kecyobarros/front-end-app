userController = {};

userController.Services = (function () {
    'use strict';

    function uriFindPage(page) {
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
        var connectionID = this.connection.id;
        UserCollection.remove({sessionID: connectionID});
        var result = userController.App.uriFindPage(page);
        for (var k in result.content){
          var json = result.content[k];
          json.sessionID = connectionID;
          UserCollection.insert(result.content[k]);
        }
    },

    removeUsers: function (connectionID){
      UserCollection.remove({sessionID: connectionID});
    },

    uriFindById: function (id) {
        return userController.App.uriFindById(company, structureId, json);
    }
});
