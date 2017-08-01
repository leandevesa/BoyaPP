$(document).ready(function() {

    var empresa = getUrlParameter("empresa");
    var fecha = getUrlParameter("fecha");

    cargarContactos(empresa, fecha);
});

function cargarContactos(empresa, fecha) {
    
    firebase.database().ref('/contacts/' + empresa + "/" + fecha + "/").once('value').then(function(snapshot) {
        
        var contactos = snapshot.val();

        for (unaEdad in contactos) {
            var ids = contactos[unaEdad];
            for (unId in ids) {

                var unContacto = ids[unId];

                var tr = $("<tr></tr>");

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

        $("#contactosDiv").addClass("active");
        $("#contactosDiv").removeClass("inactive");

        sacarCargando();
    });
}