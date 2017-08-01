var csv;

function inicializarCSV() {

    csv = "";
}

function agregarContactoACSV(unContacto, unaEmpresa, unaEdad) {

    csv += generarCSV(unContacto, unaEmpresa, unaEdad);
}

function generarCSV(unContacto, unaEmpresa, unaEdad) {
    var linea;

    linea = unaEmpresa + ",";
    linea += unaEdad + ",";
    linea += unContacto.nombre + ",";
    linea += unContacto.apellido + ",";
    linea += unContacto.celular + ",";

    return linea + "\n";
}

function downloadCSV(unaEmpresa, fecha) {

    fecha = fecha.replace(/\//g, "-");

    var filename = "Contactos (" + unaEmpresa + "-" + fecha + ").csv";

    csv = csv.replace("\n", String.fromCharCode(13));
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
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