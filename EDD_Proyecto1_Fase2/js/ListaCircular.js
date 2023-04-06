class NodoCi {
    constructor(dato) {
        this.dato = dato
        this.siguiente = null
    }
}
class ListaCircular {
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
            console.log(tmp.dato)
            tmp = tmp.siguiente
            count++
        }
    }

    Grafici() {
        var aux = this.primero
        var cont = 0
        var cadena = ""
        cadena += 'digraph G { \n'
        while (aux.siguiente != this.primero) {
            cadena += 'Node' + cont + '[label=\"' + aux.dato + '\"];\n'
            if (aux != this.primero) {
                cadena += 'Node' + cont - 1 + ' -> ' + 'Node' + cont + ';\n'
            }
            cont += 1
            aux = aux.siguiente
        }
        cadena += 'Node' + cont + '[label=\"' + aux.dato + '\"];\n'
        cadena += 'Node' + cont - 1 + ' -> ' + 'Node' + cont + ';\n'
        cadena += 'Node' + cont + ' -> ' + 'Node' + 0 + ';\n'
        cadena += '}'
    }
}