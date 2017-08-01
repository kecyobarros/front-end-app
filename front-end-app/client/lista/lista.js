Template.lista.helpers({

  usuarios : function(){
    var pagina = 0;
    Session.set("pagina", pagina);
    Meteor.call('userFindPage', pagina);
    var json = UserCollection.find({});
    return json;
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

Template.lista.events({
    "click [data-action='detalhe']": function (event, template) {
        event.preventDefault();
        var user = this;
        Meteor.call('deviceFindByUserId', user.id);
    },

    "click [data-action='previous']": function (event, template) {
        event.preventDefault();
        var pagina = getPagina();

        if (pagina > 0){
          pagina = anteriorPagina();
          Meteor.call('userFindPage', pagina);
        }
    },

    "click [data-action='next']": function (event, template) {
        event.preventDefault();
        var pagina = proximaPagina();
        Meteor.call('userFindPage', pagina);
    }
});
