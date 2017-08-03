$(document).ready(function() {

    var contactosOff = localStorage.getItem("contactosOff");
    var status = localStorage.getItem("status");

    if (!contactosOff) {

        contactosOff = [];
    } else {

        contactosOff = JSON.parse(contactosOff);
    }
    
    sincronizar(contactosOff);
});

function sincronizar(contactos) {

    for (var i = 0; i < contactos.length; i++) {

        var unContacto = contactos[i];

        var empresa = unContacto.empresa;
        var edad = unContacto.edad;
        var fecha = unContacto.fecha;

        delete unContacto.empresa;
        delete unContacto.edad;
        delete unContacto.fecha;

        var newPostKey = firebase.database().ref().child('posts').push().key;

        var contacts = {};  
        contacts['/contacts/' + empresa + "/" + edad + "/" + fecha + "/" + newPostKey] = unContacto;

        firebase.database().ref().update(contacts);
    }

    localStorage.removeItem("contactosOff");

    $("#status").html("Contactos sincronizados ok!");
}