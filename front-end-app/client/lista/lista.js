Template.lista.helpers({
  usuarios : function(){
    Meteor.call('userFindPage', 1);
    return UserCollection.find({});
  }
});

Template.lista.events({
    "click [data-action='detalhe']": function (event, template) {
        event.preventDefault();
        var user = this;
        Meteor.call('deviceFindById', user.devices, function (error, result) {
            alert(result[0].id);
        });
    }
});
