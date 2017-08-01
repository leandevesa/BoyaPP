var empresa, edad;

$(document).ready(function() {

    mostrarControles();

    $("#agregar").click(function() {

        if (puedeAgregarContacto()) {

            var nombre = $("#nombre").val();
            var apellido = $("#apellido").val();
            var mail = $("#mail").val();
            var celular = $("#celular").val();
            var instagram = $("#instagram").val();
            var colegio = $("#colegio").val();
            var anoEgreso = $("#anoEgreso").val();

            pushContact(nombre, apellido, mail, celular, instagram, colegio, anoEgreso);

            $("input").val("");
            $('input[tabindex=1]').focus();
        }
    });

    $("input").keypress(function(e) {

        if (e.which == 13) {


            var estaVisible = false;
            var hayMasBotones = true;
            var tabIndexActual = parseInt($(this).attr("tabindex"), 10);

            while ((hayMasBotones) && (!estaVisible)) {

                tabIndexActual++;
                var proximoControl = $('input[tabindex=' + tabIndexActual + ']');

                if (proximoControl.length == 0) {
                    hayMasBotones = false;
                } else {
                    if ($(proximoControl).parent().css("display") !== "none") {

                        estaVisible = true;
                    }
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

    $("input[type='number']").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

function celularValido() {

    if ($("#celular").css("display") !== "none") {

        var error = "";
        var nrCelular = $("#celular").val();

        if (!(nrCelular.length === 10)) {

            error = "El numero de celular debe tener exactamente 10 caracteres";
        }

        if (isNaN(nrCelular)) {

            error = "El numero de celular solo debe contener numeros, ni guiones, ni codigo de area, etc"
        }

        if (error !== "") {

            alert(error);
            $("#celular").focus();
            return false;
        }
    }

    return true;
}

function puedeAgregarContacto() {
    
    return celularValido();
}

function mostrarControles() {

    empresa = getUrlParameter("empresa");
    edad = getUrlParameter("edad");

    if (edad.toUpperCase() === ("Adolescentes").toUpperCase()) {

        $("#divInstagram").css("display", "block");
        $("#divAnoEgreso").css("display", "block");
        $("#divMail").css("display", "none");
    }

    if (edad.toUpperCase() === ("Adultos").toUpperCase()) {
        
        $("#divCelular").find("label").first().html("Celular");
        $("#divCelular").find("input").first().attr("placeholder", "Celular");

        $("#divColegio").find("label").first().html("Colegio hijo");
        $("#divColegio").find("input").first().attr("placeholder", "Colegio hijo");
    }
    
    setTimeout(function() {
        
        $('input[tabindex=1]').focus();
    }, (400));

    $("#datos").css("display", "block");
}

function pushContact(unNombre, unApellido, unMail, unCelular,
                    unInstagram, unColegio, unAnoEgreso) {

    var fecha = getFechaEnString();
        
    var contact = {
        nombre: unNombre,
        apellido: unApellido,
        mail: unMail,
        celular: unCelular,
        instagram: unInstagram,
        colegio: unColegio,
        anoEgreso: unAnoEgreso
    };

    // upd db

    var status = localStorage.getItem("status");

    if (status === "online") {

        // Get a new key
        var newPostKey = firebase.database().ref().child('posts').push().key;

        var contacts = {};  
        contacts['/contacts/' + empresa + "/" + edad + "/" + fecha + "/" + newPostKey] = contact;

        firebase.database().ref().update(contacts);

        alert("Contacto agregado!");
    } else {
        
        var contactosOff = localStorage.getItem("contactosOff");

        if (!contactosOff) {

            contactosOff = [];
        } else {

            contactosOff = JSON.parse(contactosOff);
        }

        contact["empresa"] = empresa;
        contact["edad"] = edad;
        contact["fecha"] = fecha;

        contactosOff.push(contact);

        localStorage.setItem("contactosOff", JSON.stringify(contactosOff));

        alert("Contacto agregado!");
    }

    // add contact to agenda

    try {
        saveContact(contact);
    }
    catch(err) {
    }
}

function saveContact(unContacto) {
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

function saveSuccess(contacts) {
    console.log("Contact Saved Successfully!!!");
}

function saveError(error) {
    console.log(error.code);
}

function getFechaEnString() {

    var hoy = new Date();
    var fecha = hoy.getFullYear() + "/";
        fecha += (hoy.getMonth() + 1).toString() + "/";
        fecha += hoy.getDate().toString();

    return fecha;
}