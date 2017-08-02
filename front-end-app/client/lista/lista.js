Template.lista.helpers({
  usuarios : function(){
    var pagina = 0;
    setPagina(pagina);
    var session = Session.get("sessionID");
    Meteor.call('userFindPage', pagina);
    return UserCollection.find({sessionID: session});
  }
});

getPagina = function(){
  return Session.get("pagina");
}

setPagina = function(pagina){
   Session.set("pagina", pagina);
}

proximaPagina = function(){
  var pagina = getPagina();
  pagina++;
  setPagina(pagina);

  if($( "#liPrevious, #liPreviousFooter" ).hasClass("disabled")){
    $( "#liPrevious, #liPreviousFooter" ).removeClass("disabled");
  }

  return pagina;
}

anteriorPagina = function(){
  var pagina = getPagina();
  pagina--;
  setPagina(pagina);
  if (pagina <=0){
    $( "#liPrevious, #liPreviousFooter" ).addClass( "disabled" );
  }
  return pagina;
}

busarPorPagina = function(pagina){
    Meteor.call('userFindPage', pagina);
}

Template.lista.events({
    "click [data-action='detalhe']": function (event, template) {
        event.preventDefault();
        var user = this;
        Meteor.call('deviceFindByUserId', user.id);
    },

    "click [data-action='previous']": function (event, template) {
        event.preventDefault();
        if (getPagina() > 0){
          busarPorPagina(anteriorPagina());
        }
    },

    "click [data-action='next']": function (event, template) {
        event.preventDefault();
        busarPorPagina(proximaPagina());
    }
});
