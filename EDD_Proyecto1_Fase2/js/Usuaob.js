class NodoCi {
    constructor(dato) {
        this.dato = dato
        this.siguiente = null
    }
}
class ListaCircularC {
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

    Impri() {
        var tmp = this.primero
        var count = 0;
        while (count < this.size) {
            console.log(tmp.dato.accion)
            tmp = tmp.siguiente
            count++
        }
    }

    Grafici() {
        let tmp = this.primero
        let cadena = ""
        cadena += "digraph G {\n"
        for (let x = 0; x < this.size; x++) {
            cadena += `us${x}[label = \"Accion: ${tmp.dato.accion}, Fecha: ${tmp.dato.fecha}, Hora: ${tmp.dato.hora}\ "];\n`;
            tmp = tmp.siguiente
        }
        tmp = this.primero
        for (let x = 0; x < this.size; x++) {
            if (x == this.size - 1) {
                cadena += `us${x} -> us${0};\n`;
            } else {
                cadena += `us${x} -> us${x+1};\n`;
            }
        }
        cadena += "}"
        console.log(cadena)
        return cadena
    }
}
class Usuaob {
    constructor(nombre, carnet, password, carpeta_raiz) {
        this.nombre = nombre
        this.carnet = carnet
        this.password = password
        this.carpeta_raiz = carpeta_raiz
        this.arbolinde = new ArbolIndexado();
        this.bitacora = new ListaCircularC();
    }

    InsertarCir(nuevo) {
        return this.bitacora.InsertCir(nuevo);
    }
    Graficir() {
        return this.bitacora.Grafici();
    }
    getindex(NombreFolder, indice) {
        return this.arbolinde.InsertarCa(NombreFolder, indice);
    }
    getHTMLInde(direccion) {
        return this.arbolinde.getHTML(direccion);
    }
    eliminde(NombreFolder, indice) {
        return this.arbolinde.EliminarCar(NombreFolder, indice);
    }
    buscacar(indice) {
        return this.arbolinde.ObtFolder(indice);
    }
    GrafiInde() {
        return this.arbolinde.Graficar();
    }
    ObteLocalInde() {
        return this.arbolinde;
    }
    ObteLocalIndeGet(usuario) {
        let nombre = "ArbolInde" + usuario;
        let temp = localStorage.getItem(nombre);
        this.arbolinde.raiz = JSON.parse(temp).raiz;
        return "realizado";
    }
    InsertarArchi(direccion, names, resu, types) {
        let nodo = this.arbolinde.ObtFolder(direccion)
        let res = nodo.files.find(child => child.name == names);
        if (typeof res == 'undefined' || res == null) {
            nodo.files.push({
                name: names,
                content: resu,
                type: types
            })
            nodo.matriz.addDispersa(names, contax, 0);
            return names;
        } else {
            let nombre = "Copia " + names;
            nodo.files.push({
                name: nombre,
                content: resu,
                type: types
            })
            nodo.matriz.addDispersa(nombre, contax, 0);
            return "Copia " + names;
        }
    }
    GrafiMatri(direccion) {
        let nodo = this.arbolinde.ObtFolder(direccion)
        if (nodo.files.length == 0) {
            alert("No se puede mostrar la grafica porque no hay archivos");
        } else {
            nodo.matriz.graficarDispersa();
        }
    }
    InsertarMatri() {

    }
}