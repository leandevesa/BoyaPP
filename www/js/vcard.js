var vcf;

function inicializarVCARD() {

    var unContacto = {
        nombre: "fake",
        apellid: "fake",
        celular: "fake"
    }

    vcf = generarVCARD(unContacto);
}

function agregarContactoAVCARD(unContacto) {

    vcf += generarVCARD(unContacto);
}

function generarVCARD(unContacto) {
    var vCard;

    vCard = "BEGIN:VCARD" + "\n";
    vCard += "VERSION:3.0" + "\n";
    vCard += "N:" + unContacto.nombre + ";" + unContacto.apellido + ";;;" + "\n";
    vCard += "FN:" + unContacto.apellido + " " + unContacto.nombre + "\n";
    vCard += "TEL;TYPE=CELL;TYPE=pref;TYPE=VOICE:" + unContacto.celular + "\n";
    vCard += "PRODID:-//Apple Inc.//iCloud Web Address Book 17E66//EN" + "\n";
    vCard += "REV:2017-07-25T18:09:06Z" + "\n";
    vCard += "END:VCARD" + "\n";

    return vCard;
}

function downloadVCARD(filename) {
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