class Permi {
    constructor(propietario, destino, ubicacion, archivo, permisos) {
        this.propietario = propietario
        this.destino = destino
        this.ubicacion = ubicacion
        this.archivo = archivo
        this.permisos = permisos
    }

}
class NodoCi {
    constructor(dato) {
        this.dato = dato
        this.siguiente = null
    }
}
class ListaPermisos {
    constructor() {
        this.primero = null
        this.size = 0
        this.files = []
    }

    InsertCir(dato) {
        var tmp = new NodoCi(dato)
        tmp.siguiente = this.primero
        this.primero = tmp
        this.size++
    }

    GrafTabla() {
        let text = ""
        var tmp = this.primero
        var count = 0;
        while (count < this.size) {
            this.files.map(file => {
                if (file.type === 'text/plain') {
                    let archivo = new Blob([file.content], { type: file.type });
                    const url = URL.createObjectURL(archivo);
                    if (file.name == tmp.dato.archivo) {
                        text += '<tr><td><center>' + tmp.dato.propietario + '</center></td><td><p style="text-align: justify">' + tmp.dato.destino + '</p></td><td><p style="text-align: justify">' + tmp.dato.ubicacion + '</p></td><td><p style="text-align: justify">' + `<a href="${url}" download>${file.name}</a>` + '</p></td><td><p style="text-align: justify">' + tmp.dato.permisos + '</p></td></tr>\n'
                    }
                } else {
                    if (file.name == tmp.dato.archivo) {
                        text += '<tr><td><center>' + tmp.dato.propietario + '</center></td><td><p style="text-align: justify">' + tmp.dato.destino + '</p></td><td><p style="text-align: justify">' + tmp.dato.ubicacion + '</p></td><td><p style="text-align: justify">' + `<a href="${file.content}" download>${file.name}</a>` + '</p></td><td><p style="text-align: justify">' + tmp.dato.permisos + '</p></td></tr>\n'
                    }
                }
            })
            tmp = tmp.siguiente
            count++
        }
        return text;
    }

    Buscar(destino) {
        var tmp = this.primero
        var count = 0;
        while (count < this.size) {
            if (tmp.dato.destino == destino) {
                return "Encontrado"
            }
            tmp = tmp.siguiente
            count++
        }
        return "No Encontrado"
    }
    BuscarArchivos(destino) {
        let text = ""
        var tmp = this.primero
        var count = 0;
        while (count < this.size) {
            if (tmp.dato.destino == destino) {
                this.files.map(file => {
                    if (file.type === 'text/plain') {
                        let archivo = new Blob([file.content], { type: file.type });
                        const url = URL.createObjectURL(archivo);
                        if (file.name == tmp.dato.archivo) {
                            if (tmp.dato.permisos == "r") {
                                text += '<br><br>'
                                text += '<h6>Archivo .txt compartido por: ' + tmp.dato.propietario + ' la locacion del archivo es: ' + tmp.dato.ubicacion + ' tipo de permiso: ' + tmp.dato.permisos + ' </h6>'
                                text += '<textarea  id="' + file.name + '" rows="10" cols="50">' + file.content + '</textarea>';
                                text += '<br><br>'
                            } else if (tmp.dato.permisos == "r-w" || tmp.dato.permisos == "w") {
                                text += '<br><br>'
                                text += '<h6>Archivo .txt compartido por: ' + tmp.dato.propietario + ' la locacion del archivo es: ' + tmp.dato.ubicacion + ' tipo de permiso: ' + tmp.dato.permisos + ' </h6>'
                                text += '<textarea  id="txt' + file.name + '" rows="10" cols="50">' + file.content + '</textarea>';
                                let nombre = "txt" + file.name
                                text += '<a class="btn btn-primary  rounded-pill " onclick="GuardarCambios(' + nombre + ')">Guardar Cambios</a>';
                                text += '<br><br>'
                            }

                        }
                    } else if (file.type == 'application/pdf') {
                        if (file.name == tmp.dato.archivo) {
                            text += '<br><br>'
                            text += '<h6>Archivo pdf compartido por: ' + tmp.dato.propietario + ' la locacion del archivo es: ' + tmp.dato.ubicacion + ' </h6>'
                            text += '<iframe src ="' + file.content + '" width = "500" height = "300" > </iframe>'
                            text += '<br><br>'
                        }
                    } else {
                        if (file.name == tmp.dato.archivo) {
                            text += '<br><br>'
                            text += '<h6>Archivo imagen compartido por: ' + tmp.dato.propietario + ' la locacion del archivo es: ' + tmp.dato.ubicacion + ' </h6>'
                            text += '<img src="' + file.content + '" width="500" height="300" >'
                            text += '<br><br>'
                        }
                    }
                })
            }
            tmp = tmp.siguiente
            count++
        }
        return text;
    }

    EditaTxt(destino, nombrearchivo, contenido) {
        let text = ""
        var tmp = this.primero
        var count = 0;
        while (count < this.size) {
            if (tmp.dato.destino == destino) {
                this.files.map(file => {
                    if (file.type === 'text/plain') {
                        let archivo = new Blob([file.content], { type: file.type });
                        const url = URL.createObjectURL(archivo);
                        if (file.name == nombrearchivo) {
                            file.content = contenido;
                        }
                    }
                })
            }
            tmp = tmp.siguiente
            count++
        }
        return text;
    }

}