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
        this.ultimo = null
        this.size = 0
        this.files = []
    }

    InsertCir(dato) {
        var tmp = new NodoCi(dato)
        if (this.primero == null) {
            this.primero = tmp
            this.ultimo = this.primero
        } else {
            this.ultimo.siguiente = tmp
            this.ultimo = tmp
            this.ultimo.siguiente = this.primero.siguiente
        }
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
        var tmp = this.primero
        var count = 0;
        while (count < this.size) {
            if (tmp.dato.destino == destino) {
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
            }
            tmp = tmp.siguiente
            count++
        }
        return "No Encontrado"
    }

}