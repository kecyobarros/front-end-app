Template.modalDetalhe.helpers({
  devices : function(){
    var session = Session.get("sessionID");
    return DeviceCollection.find({sessionID: session});
  }
});
