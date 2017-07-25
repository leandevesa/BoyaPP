$(document).ready(function() {

    $("#loginBtn").click(function() {

        $("#loginDiv").removeClass("active");
        $("#loginDiv").addClass("inactive");

        mostrarCargando();
        auth();
    });

    $("#verContactosJump").click(function() {

        sacarMenu();
        mostrarCargando();
        cargarContactos("Jump");
    });

    $("#verContactosMatinee").click(function() {

        sacarMenu();
        mostrarCargando();
        cargarContactos("Matinee");
    });
});

function auth() {
    
    firebase.database().ref('/sensible/').once('value').then(function(snapshot) {

        if ($("#passLogin").val() !== snapshot.val()) {

            $("#loginDiv").addClass("active");
            $("#loginDiv").removeClass("inactive");
        } else {

            $("#menuDiv").addClass("active");
            $("#menuDiv").removeClass("inactive");
        }
            
        sacarCargando();
    });
}

function cargarContactos(edad) {
    
    firebase.database().ref('/contacts/' + edad + "/").once('value').then(function(snapshot) {
        
        var contactos = snapshot.val();
        console.log(contactos);

        $("#contactosDiv").addClass("active");
        $("#contactosDiv").removeClass("inactive");

        for (unaEdad in contactos) {
            var anios = contactos[unaEdad];
            for (unAnio in anios) {
                var meses = anios[unAnio];
                for (unMes in meses) {
                    var dias = meses[unMes];
                    for (unDia in dias) {
                        var ids = dias[unDia];
                        for (unId in ids) {

                            var unContacto = ids[unId];

                            var tr = $("<tr></tr>");

                            var fecha = $("<td></td>");
                            fecha.html(unDia + "/" + unMes + "/" + unAnio);
                            tr.append(fecha);

                            var nombreYApellido = $("<td></td>");
                            nombreYApellido.html(unContacto.apellido + " " + unContacto.nombre);
                            tr.append(nombreYApellido);

                            var celular = $("<td></td>");
                            celular.html(unContacto.celular);
                            tr.append(celular);

                            var instagram = $("<td></td>");
                            instagram.html(unContacto.instagram);
                            tr.append(instagram);

                            var mail = $("<td></td>");
                            mail.html(unContacto.mail);
                            tr.append(mail);

                            var colegio = $("<td></td>");
                            colegio.html(unContacto.colegio);
                            tr.append(colegio);

                            $("#contactosBody").append(tr);
                        }
                    }
                }
            }
        }

        sacarCargando();
    });
}

function mostrarCargando() {
    $("#loadingDiv").addClass("active");
    $("#loadingDiv").removeClass("inactive");
}

function sacarCargando() {
    $("#loadingDiv").removeClass("active");
    $("#loadingDiv").addClass("inactive");
}

function sacarMenu() {
    $("#menuDiv").removeClass("active");
    $("#menuDiv").addClass("inactive");
}