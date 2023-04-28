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
            text += '<tr><td><center>' + tmp.dato.propietario + '</center></td><td><p style="text-align: justify">' + tmp.dato.destino + '</p></td><td><p style="text-align: justify">' + tmp.dato.ubicacion + '</p></td><td><p style="text-align: justify">' + tmp.dato.archivo + '</p></td><td><p style="text-align: justify">' + tmp.dato.permisos + '</p></td></tr>\n'
            tmp = tmp.siguiente
            count++
        }
        return text;
    }

}