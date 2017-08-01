$(document).ready(function() {
    checkInternet();
});

function checkInternet() {
    $.ajax({
        url: "https://boyapp-f677f.firebaseio.com/online.json",
        timeout: 10000,
        error: function(jqXHR) { 
            alert("No se pudo conectar a internet. La aplicacion funcionara OFFLINE. Luego tendra que sincronizar los contactos agregados");
            localStorage.setItem("status", "offline");
            mostrarIndex();
        },
        success: function() {
            localStorage.setItem("status", "online");
            mostrarIndex();
        }
    });
}

function mostrarIndex() {
    $("#detecting").css("display", "none");
    $("#main").css("display", "block");

    var contactosOff = localStorage.getItem("contactosOff");

    if (!contactosOff) {

        contactosOff = [];
    } else {

        contactosOff = JSON.parse(contactosOff);
    }
    var cantidad = 0;

    if (contactosOff) {
        cantidad = contactosOff.length;
    }

    $("#contactosOff").find("h4").html("Tiene " + cantidad + " contactos sin sincronizar");
}