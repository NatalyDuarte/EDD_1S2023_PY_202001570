class nodoAVL {

    constructor(dato) {
        this.dato = dato;
        this.fe = 0;
        this.izquierda = null;
        this.derecha = null;
    }

    textoGraphviz() {
        if (this.izquierda == null && this.derecha == null) {
            var name = this.dato.carnet.toString().replace(/ /g, "")
            return name;
        } else {
            var texto = "";
            if (this.izquierda != null) {
                var name1 = this.dato.carnet.toString().replace(/ /g, "")
                texto += name1 + "->" + this.izquierda.textoGraphviz() + "\n";
            }
            if (this.derecha != null) {
                var name2 = this.dato.carnet.toString().replace(/ /g, "")
                texto += name2 + "->" + this.derecha.textoGraphviz() + "\n";
            }
            return texto;
        }
    }
}