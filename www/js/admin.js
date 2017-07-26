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
        cargarFechas("Jump");
    });

    $("#verContactosMatinee").click(function() {

        sacarMenu();
        mostrarCargando();
        cargarFechas("Matinee");
    });

    $("#passLogin").keypress(function(e) {

        if (e.which === 13) {
            $("#loginBtn").click();
        }
    });

    setTimeout(function() {
        $("#passLogin").focus();
    }, 250);
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

function cargarFechas(empresa) {
    
    firebase.database().ref('/contacts/' + empresa + "/").once('value').then(function(snapshot) {
        
        var i = 0;

        var contactos = snapshot.val();

        for (unAnio in contactos) {
            var meses = contactos[unAnio];
            for (unMes in meses) {
                var dias = meses[unMes];
                for (unDia in dias) {

                    var todos = dias[unDia];

                    var tr = $("<tr></tr>");

                    var fechaCompleta = unAnio + "/" + unMes + "/" + unDia;

                    var fecha = $("<td></td>");
                    fecha.html(unDia + "/" + unMes + "/" + unAnio);
                    tr.append(fecha);

                    var ver = $("<td></td>");
                    var botonVer = $('<a style="width:100%;" class="btn btn-info btn-sm" href="javascript:detalleContactos(' + "'" + empresa + "','" + fechaCompleta + "'" + ')"" role="button">Ver</a>');
                    ver.append(botonVer);
                    tr.append(ver);

                    var descarga = $("<td></td>");
                    var botonDescarga = $('<a style="width:100%;" class="btn btn-danger btn-sm" href="javascript:descargarContactos(' + "'" + empresa + "','" + fechaCompleta + "'" + ', ' + i.toString() + ')" role="button">Descargar</a>');
                    descarga.append(botonDescarga);
                    tr.append(descarga);

                    var descargado = $("<td></td>");
                    descargado.html((todos.descargado ? "Si" : "No"));
                    tr.append(descargado);

                    if (!todos.descargado) {
                        tr.addClass("info");
                    }

                    $("#fechasBody").append(tr);
                    i++;
                }
            }
        }

        $("#fechasDiv").addClass("active");
        $("#fechasDiv").removeClass("inactive");

        sacarCargando();
    });
}

function detalleContactos(empresa, fecha) {

    var url = "detalleContactos.html?empresa=" + empresa + "&fecha=" + fecha;

    window.open(url, 'Detalle contactos', 'height=500, width=500');
}

function descargarContactos(empresa, fecha, trIndex) {
    
    firebase.database().ref('/contacts/' + empresa + "/" + fecha + "/").once('value').then(function(snapshot) {

        inicializarVCARD();
        
        var contactos = snapshot.val();
        console.log(contactos);

        for (unaEdad in contactos) {
            var ids = contactos[unaEdad];
            for (unId in ids) {

                var unContacto = ids[unId];

                agregarContactoAVCARD(unContacto, empresa, unaEdad);
            }
        }

        downloadVCARD(empresa, fecha);
        setDescargado(empresa, fecha, trIndex);
    });
}

function setDescargado(empresa, fecha, trIndex) {
    var contacts = {};  
    contacts['/contacts/' + empresa + "/" + fecha + "/descargado"] = true;

    firebase.database().ref().update(contacts);

    var tr = $($("#fechasBody").find("tr")[trIndex]);

    tr.removeClass("info");

    var td = tr.find("td").last().html("Si");
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