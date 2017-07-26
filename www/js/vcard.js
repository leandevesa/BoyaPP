var vcf;

function inicializarVCARD() {

    var unContacto = {
        nombre: "fake",
        apellid: "fake",
        celular: "fake"
    }

    vcf = generarVCARD(unContacto);
}

function agregarContactoAVCARD(unContacto, unaEmpresa, unaEdad) {

    vcf += generarVCARD(unContacto, unaEmpresa, unaEdad);
}

function generarVCARD(unContacto, unaEmpresa, unaEdad) {
    var vCard;

    if (!unaEdad) {
        unaEdad = "";
    }

    if (!unaEmpresa) {
        unaEmpresa = "";
    }

    vCard = "BEGIN:VCARD" + "\n";
    vCard += "VERSION:3.0" + "\n";
    vCard += "N:" + unContacto.nombre + ";" + "[" + unaEmpresa + " - " + unaEdad + "] " + unContacto.apellido + ";;;" + "\n";
    vCard += "FN:" + unContacto.apellido + " " + unContacto.nombre + "\n";
    vCard += "TEL;TYPE=CELL;TYPE=pref;TYPE=VOICE:" + unContacto.celular + "\n";
    vCard += "PRODID:-//Apple Inc.//iCloud Web Address Book 17E66//EN" + "\n";
    vCard += "REV:2017-07-25T18:09:06Z" + "\n";
    vCard += "END:VCARD" + "\n";

    return vCard;
}

function downloadVCARD(unaEmpresa, fecha) {

    fecha = fecha.replace(/\//g, "-");

    var filename = "Contactos (" + unaEmpresa + "-" + fecha + ").vcf";

    vcf = vcf.replace("\n", String.fromCharCode(13));
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vcf));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}