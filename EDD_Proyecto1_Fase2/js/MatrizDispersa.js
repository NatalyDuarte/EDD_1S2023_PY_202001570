class nodoCabecera {
    constructor(id) {
        this.id = id
        this.anterior = null
        this.anterior = null
        this.acceso = null
    }
}

class nodoSub {
    constructor(dato, ejex, ejey) {
        this.dato = dato
        this.valorx = ejex
        this.valory = ejey
        this.izquierda = null
        this.derecha = null
        this.arriba = null
        this.abajo = null
    }
}

class ListaCabecera {
    constructor(tipo) {
        this.primero = null
        this.ultimo = null
        this.tipo = tipo
        this.size = 0
    }

    addNodoCabecera(nuevo) {
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else {
            if (nuevo.id < this.primero.id) {
                nuevo.siguiente = this.primero
                this.primero.anterior = nuevo
                this.primero = nuevo
            } else if (nuevo.id > this.ultimo.id) {
                this.ultimo.siguiente = nuevo
                nuevo.anterior = this.ultimo
                this.ultimo = nuevo
            } else {
                var tmp = this.primero
                while (tmp != null) {
                    if (nuevo.id < tmp.id) {
                        nuevo.siguiente = tmp
                        nuevo.anterior = tmp.anterior
                        tmp.anterior.siguiente = nuevo
                        tmp.anterior = nuevo
                        break
                    } else if (nuevo.id > tmp.id) {
                        tmp = tmp.siguiente
                    } else {
                        break
                    }
                }
            }
        }
        this.size += 1
    }

    showCabecera() {
        var tmp = this.primero
        while (tmp != null) {
            console.log(this.tipo, tmp.id)
            tmp = tmp.siguiente
        }
    }

    getCabecera(id) {
        var tmp = this.primero
        while (tmp != null) {
            if (tmp.id == id) {
                return tmp
            }
            tmp = tmp.siguiente
        }
        return null
    }
}

class Dispersa {
    constructor(data) {
        this.data = data
        this.fila = new ListaCabecera("fila")
        this.columna = new ListaCabecera("columna")
    }

    addDispersa(dato, ejex, ejey) {
        var nuevo = new nodoSub(dato, ejex, ejey)
        var nodox = this.fila.getCabecera(ejex)
        var nodoy = this.columna.getCabecera(ejey)

        if (nodox == null) {
            nodox = new nodoCabecera(ejex)
            this.fila.addNodoCabecera(nodox)
        }

        if (nodoy == null) {
            nodoy = new nodoCabecera(ejey)
            this.columna.addNodoCabecera(nodoy)
        }

        if (nodox.acceso == null) {
            nodox.acceso = nuevo
        } else {
            if (nuevo.valory < nodox.acceso.valory) {
                nuevo.derecha = nodox.acceso
                nodox.acceso.izquierda = nuevo
                nodox.acceso = nuevo
            } else {
                var tmp = nodox.acceso
                while (tmp != null) {
                    if (nuevo.valory < tmp.valory) {
                        nuevo.derecha = tmp
                        nuevo.izquierda = tmp.izquierda
                        tmp.izquierda.derecha = nuevo
                        tmp.izquierda = nuevo
                        break
                    } else if (nuevo.valorx == tmp.valorx && nuevo.valory == tmp.valory) {
                        break
                    } else {
                        if (tmp.derecha == null) {
                            tmp.derecha = nuevo
                            nuevo.izquierda = tmp
                            break
                        } else {
                            tmp = tmp.derecha
                        }
                    }
                }
            }
        }
        if (nodoy.acceso == null) {
            nodoy.acceso = nuevo
        } else {
            if (nuevo.valorx < nodoy.acceso.valorx) {
                nuevo.abajo = nodoy.acceso
                nodoy.acceso.arriba = nuevo
                nodoy.acceso = nuevo
            } else {
                var aux = nodoy.acceso
                while (aux != null) {
                    if (nuevo.valorx < aux.valorx) {
                        nuevo.abajo = aux
                        nuevo.arriba = aux.arriba
                        aux.arriba.abajo = nuevo
                        aux.arriba = nuevo
                        break
                    } else if (nuevo.valorx == aux.valorx && nuevo.valory == aux.valory) {
                        break
                    } else {
                        if (aux.abajo == null) {
                            aux.abajo = nuevo
                            nuevo.arriba = aux
                            break
                        } else {
                            aux = aux.abajo
                        }
                    }
                }
            }
        }
    }

    graficarDispersa() {
        var dot = 'digraph G{ \nnode[shape=box]'
        dot += '\nbgcolor=none\nraiz[label = \"   \",color=black, style=filled fillcolor=cornsilk, group=1]\n'
        dot += 'label = "LIBROS THRILLER" \n'


        // ************************************ filas **************************************
        //nodos
        var filaX = this.fila.primero
        while (filaX != null) {
            dot += 'F' + filaX.id + '[label="Fila ' + filaX.id + '",color=black, style=filled fillcolor=cornsilk,group=1];\n'
            filaX = filaX.siguiente
        }

        //apuntadores
        filaX = this.fila.primero
        while (filaX != null) {
            if (filaX.siguiente != null) {
                dot += 'F' + filaX.id + ' -> F' + filaX.siguiente.id + '\n'
                dot += 'F' + filaX.siguiente.id + ' -> F' + filaX.id + '\n'
            }
            filaX = filaX.siguiente
        }

        // ************************************ columnass **************************************
        //nodos
        var columnaY = this.columna.primero
        while (columnaY != null) {
            var grupo = columnaY.id + 1
            dot += 'C' + columnaY.id + '[label="Columna ' + columnaY.id + '",color=black, style=filled fillcolor=cornsilk,group=' + grupo + '];\n'
            columnaY = columnaY.siguiente
        }
        // apuntadores
        var count = 0
        columnaY = this.columna.primero
        while (columnaY != null) {
            if (columnaY.siguiente != null) {
                dot += 'C' + columnaY.id + ' -> C' + columnaY.siguiente.id + ';\n'
                dot += 'C' + columnaY.siguiente.id + ' -> C' + columnaY.id + ';\n'
            }
            count++
            columnaY = columnaY.siguiente
        }

        // ************************************ enlace entre F y C **************************************
        filaX = this.fila.primero
        columnaY = this.columna.primero
        dot += 'raiz -> F' + filaX.id + '\n'
        dot += 'raiz -> C' + columnaY.id + '\n'
        dot += '{rank = same; raiz;'
        count = 0
        columnaY = this.columna.primero
        while (columnaY != null) {
            dot += "C" + columnaY.id + '; '
            count++
            columnaY = columnaY.siguiente
        }
        dot += '}\n'

        var aux = this.fila.primero
        var aux2 = aux.acceso
        count = 0
        while (aux != null) {
            count++
            while (aux2 != null) {
                dot += 'N' + aux2.valorx + '_' + aux2.valory + '[label="' + aux2.dato.libro + '",color=black, style=filled fillcolor=cadetblue1,group="' + (aux2.valory + 1) + '"];\n'
                aux2 = aux2.derecha
            }
            aux = aux.siguiente
            if (aux != null) {
                aux2 = aux.acceso
            }
        }
        aux = this.fila.primero
        aux2 = aux.acceso
        count = 0
        while (aux != null) {
            var rank = '{rank=same;\nF' + aux.id + ';\n'
            count = 0
            while (aux2 != null) {
                if (count == 0) {
                    dot += "F" + aux.id + " -> N" + aux2.valorx + "_" + aux2.valory + ";\n"
                    dot += "N" + aux2.valorx + "_" + aux2.valory + " -> F" + aux.id + ";\n"
                    count++
                }
                if (aux2.derecha != null) {
                    dot += "N" + aux2.valorx + "_" + aux2.valory + " -> " + "N" + aux2.derecha.valorx + "_" + aux2.derecha.valory + ";\n"
                    dot += "N" + aux2.derecha.valorx + "_" + aux2.derecha.valory + " -> " + "N" + aux2.valorx + "_" + aux2.valory + ";\n"
                }
                rank += "N" + aux2.valorx + "_" + aux2.valory + " "
                aux2 = aux2.derecha
            }
            aux = aux.siguiente
            if (aux != null) {
                aux2 = aux.acceso
            }
            dot += rank + "}\n"
        }
        aux = this.columna.primero
        aux2 = aux.acceso
        count = 0
        while (aux != null) {
            count = 0
            dot += ""
            while (aux2 != null) {
                if (count == 0) {
                    dot += 'C' + aux.id + ' -> N' + aux2.valorx + '_' + aux2.valory + ';\n'
                    dot += 'N' + aux2.valorx + '_' + aux2.valory + ' -> C' + aux.id + ';\n'
                    count++
                }
                if (aux2.abajo != null) {
                    dot += 'N' + aux2.abajo.valorx + '_' + aux2.abajo.valory + ' -> ' + "N" + aux2.valorx + "_" + aux2.valory + ';\n'
                    dot += 'N' + aux2.valorx + '_' + aux2.valory + ' -> ' + "N" + aux2.abajo.valorx + '_' + aux2.abajo.valory + ';\n'
                }
                aux2 = aux2.abajo
            }
            aux = aux.siguiente
            if (aux != null) {
                aux2 = aux.acceso
            }
        }
        dot += " } "
        return dot
    }

    graficar2() {
        var dot = 'digraph G{ \nnode[shape=box]'
        dot += '\nbgcolor=none\nedge[style=invis]\nraiz[label = \"   \",color=black, style=filled fillcolor=cornsilk, group=1]\n'
        dot += 'label = "LIBROS THRILLER" \n'


        // ************************************ filas **************************************
        //nodos
        var filaX = this.fila.primero
        while (filaX != null) {
            dot += 'F' + filaX.id + '[label="Fila ' + filaX.id + '",color=black, style=filled fillcolor=cornsilk,group=1];\n'
            filaX = filaX.siguiente
        }

        //apuntadores
        filaX = this.fila.primero
        while (filaX != null) {
            if (filaX.siguiente != null) {
                dot += 'F' + filaX.id + ' -> F' + filaX.siguiente.id + '\n'
                dot += 'F' + filaX.siguiente.id + ' -> F' + filaX.id + '\n'
            }
            filaX = filaX.siguiente
        }

        // ************************************ columnass **************************************
        //nodos
        var columnaY = this.columna.primero
        while (columnaY != null) {
            var grupo = columnaY.id + 1
            dot += 'C' + columnaY.id + '[label="Columna ' + columnaY.id + '",color=black, style=filled fillcolor=cornsilk,group=' + grupo + '];\n'
            columnaY = columnaY.siguiente
        }
        // apuntadores
        var count = 0
        columnaY = this.columna.primero
        while (columnaY != null) {
            if (columnaY.siguiente != null) {
                dot += 'C' + columnaY.id + ' -> C' + columnaY.siguiente.id + ';\n'
                dot += 'C' + columnaY.siguiente.id + ' -> C' + columnaY.id + ';\n'
            }
            count++
            columnaY = columnaY.siguiente
        }

        // ************************************ enlace entre F y C **************************************
        filaX = this.fila.primero
        columnaY = this.columna.primero
        dot += 'raiz -> F' + filaX.id + '\n'
        dot += 'raiz -> C' + columnaY.id + '\n'
        dot += '{rank = same; raiz;'
        count = 0
        columnaY = this.columna.primero
        while (columnaY != null) {
            dot += "C" + columnaY.id + '; '
            count++
            columnaY = columnaY.siguiente
        }
        dot += '}\n'

        var aux = this.fila.primero
        var aux2 = aux.acceso
        count = 0
        while (aux != null) {
            count++
            while (aux2 != null) {
                dot += 'N' + aux2.valorx + '_' + aux2.valory + '[label="' + aux2.dato.libro + '",fontsize = 8,color=black, style=filled fillcolor=cadetblue1,group="' + (aux2.valory + 1) + '"];\n'
                aux2 = aux2.derecha
            }
            aux = aux.siguiente
            if (aux != null) {
                aux2 = aux.acceso
            }
        }
        aux = this.fila.primero
        aux2 = aux.acceso
        count = 0
        while (aux != null) {
            var rank = '{rank=same;\nF' + aux.id + ';\n'
            count = 0
            while (aux2 != null) {
                if (count == 0) {
                    dot += "F" + aux.id + " -> N" + aux2.valorx + "_" + aux2.valory + ";\n"
                    dot += "N" + aux2.valorx + "_" + aux2.valory + " -> F" + aux.id + ";\n"
                    count++
                }
                if (aux2.derecha != null) {
                    dot += "N" + aux2.valorx + "_" + aux2.valory + " -> " + "N" + aux2.derecha.valorx + "_" + aux2.derecha.valory + ";\n"
                    dot += "N" + aux2.derecha.valorx + "_" + aux2.derecha.valory + " -> " + "N" + aux2.valorx + "_" + aux2.valory + ";\n"
                }
                rank += "N" + aux2.valorx + "_" + aux2.valory + " "
                aux2 = aux2.derecha
            }
            aux = aux.siguiente
            if (aux != null) {
                aux2 = aux.acceso
            }
            dot += rank + "}\n"
        }
        aux = this.columna.primero
        aux2 = aux.acceso
        count = 0
        while (aux != null) {
            count = 0
            dot += ""
            while (aux2 != null) {
                if (count == 0) {
                    dot += 'C' + aux.id + ' -> N' + aux2.valorx + '_' + aux2.valory + ';\n'
                    dot += 'N' + aux2.valorx + '_' + aux2.valory + ' -> C' + aux.id + ';\n'
                    count++
                }
                if (aux2.abajo != null) {
                    dot += 'N' + aux2.abajo.valorx + '_' + aux2.abajo.valory + ' -> ' + "N" + aux2.valorx + "_" + aux2.valory + ';\n'
                    dot += 'N' + aux2.valorx + '_' + aux2.valory + ' -> ' + "N" + aux2.abajo.valorx + '_' + aux2.abajo.valory + ';\n'
                }
                aux2 = aux2.abajo
            }
            aux = aux.siguiente
            if (aux != null) {
                aux2 = aux.acceso
            }
        }
        dot += " } "
        return dot
    }
}