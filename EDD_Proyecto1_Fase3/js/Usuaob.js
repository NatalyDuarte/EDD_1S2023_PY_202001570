class Usuaob {
    constructor(nombre, carnet, password, carpeta_raiz) {
        this.nombre = nombre
        this.carnet = carnet
        this.password = password
        this.carpeta_raiz = carpeta_raiz
        this.arbolinde = new ArbolIndexado();

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
            return names;
        } else {
            let nombre = "Copia " + names;
            nodo.files.push({
                name: nombre,
                content: resu,
                type: types
            })
            return "Copia " + names;
        }
    }
}