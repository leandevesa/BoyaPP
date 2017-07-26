var empresa, edad;
var database;

$(document).ready(function() {

    database = firebase.database();

    $("#selEmpresa > a").click(function(e) {

        empresa = $(this).html();

        $("#selEmpresa").removeClass("active");
        $("#selEmpresa").addClass("inactive");

        $("#selEdad").addClass("active");
        $("#selEdad").removeClass("inactive");
    });

    $("#selEdad > a").click(function(e) {

        edad = $(this).html();

        $("#selEdad").removeClass("active");
        $("#selEdad").addClass("inactive");

        $("#datos").addClass("active");
        $("#datos").removeClass("inactive");

        if ((empresa.toUpperCase() === ("Jump").toUpperCase()) ||
            (edad.toUpperCase() === ("Adolescentes").toUpperCase())) {

            $("#divColegio").css("display", "block");
        }

        if (edad.toUpperCase() === ("Adolescentes").toUpperCase()) {

            $("#divInstagram").css("display", "block");
        }
        
        setTimeout(function() {
            
            $('input[tabindex=1]').focus();
        }, (400));
    });

    $("#agregar").click(function() {

        var nombre = $("#nombre").val();
        var apellido = $("#apellido").val();
        var mail = $("#mail").val();
        var celular = $("#celular").val();
        var instagram = $("#instagram").val();
        var colegio = $("#colegio").val();

        pushContact(nombre, apellido, mail, celular, instagram, colegio);

        $("input").val("");
        $('input[tabindex=1]').focus();
    });

    $("input").keypress(function(e) {

        if (e.which == 13) {

            var tabIndexActual = parseInt($(this).attr("tabindex"), 10);
            tabIndexActual++;

            var proximoControl = $('input[tabindex=' + tabIndexActual + ']');
            var estaVisible = false;
            
            if (proximoControl.length == 1) {
                if ($(proximoControl).parent().css("display") !== "none") {

                    estaVisible = true;
                }
            }

            if (estaVisible) {
                proximoControl.focus();
            } else {
                $("#agregar").focus();
                $("#agregar").click();
            }
        }
    });
});

function pushContact(unNombre, unApellido, unMail, unCelular,
                    unInstagram, unColegio) {

    var fecha = getFechaEnString();
        
    var contact = {
        nombre: unNombre,
        apellido: unApellido,
        mail: unMail,
        celular: unCelular,
        instagram: unInstagram,
        colegio: unColegio
    };

    // Get a new key
    var newPostKey = firebase.database().ref().child('posts').push().key;

    var contacts = {};  
    contacts['/contacts/' + empresa + "/" + fecha + "/" + edad + "/" + newPostKey] = contact;

    firebase.database().ref().update(contacts); // upd db

    try {
        saveContact(contact);   // add contact to agenda
    }
    catch(err) {
    }
}

function saveContact(unContacto)
{
  var contact = navigator.contacts.create();
  var nameDetails = new ContactName();
  contact.name = nameDetails;
  var contactNumbers = [];
  contactNumbers[0] = new ContactField('home', unContacto.celular, true);
  contact.phoneNumbers = contactNumbers;
  var emails = [];
  emails[0] = new ContactField('email', unContacto.mail, true);
  contact.emails = emails;
  
  contact.displayName = getHonorificPrefix(unContacto);

  contact.save(saveSuccess, saveError);
}

function getHonorificPrefix(unContacto) {

    return "[" + empresa + " - " + edad + "] " + unContacto.nombre + " " + unContacto.apellido;
}

function saveSuccess(contacts)
{
    console.log("Contact Saved Successfully!!!");
}
function saveError(error)
{
    console.log(error.code);
}

function getFechaEnString() {

    var hoy = new Date();
    var fecha = hoy.getFullYear() + "/";
        fecha += (hoy.getMonth() + 1).toString() + "/";
        fecha += hoy.getDate().toString();

    return fecha;
}