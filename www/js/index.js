$(document).ready(function() {
    checkInternet();

    $("#contactosOff").click(function() {

        var contactosOff = localStorage.getItem("contactosOff");
        var status = localStorage.getItem("status");

        if (!contactosOff) {

            contactosOff = [];
        } else {

            contactosOff = JSON.parse(contactosOff);
        }
        var cantidad = 0;

        if (contactosOff) {
            cantidad = contactosOff.length;
        }

        if ((cantidad > 0) && (status === "online")) {

        }
    });
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
    var status = localStorage.getItem("status");

    if (!contactosOff) {

        contactosOff = [];
    } else {

        contactosOff = JSON.parse(contactosOff);
    }
    var cantidad = 0;

    if (contactosOff) {
        cantidad = contactosOff.length;
    }

    if (cantidad > 0) {
        if (status === "online") {
            $("#contactosOff").find("h4").html("Tiene " + cantidad + " contactos sin sincronizar. Click aqui para subirlos.");
            $("#contactosOff").prop("href", "sincronizador.html");
        } else {
            $("#contactosOff").find("h4").html("Tiene " + cantidad + " contactos sin sincronizar. Conectese a internet para poder subirlos.");
        }
    } else {
        $("#contactosOff").find("h4").html("No tiene contactos para sincronizar");
    }
}