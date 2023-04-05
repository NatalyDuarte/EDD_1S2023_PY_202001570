class nodoAVL {
    constructor(dato) {
        this.dato = dato;
        this.ArbolInde = new ArbolIndexado();
        this.fe = 0;
        this.izquierda = null;
        this.derecha = null;

    }
}
class ArbolAVL {

    constructor() {
        this.raiz = null;
    }

    //BUSCAR NODO;
    buscar(carnet, password, raiz1) {
        if (raiz1 == null) {
            return null;
        } else if (raiz1.dato.carnet == carnet) {
            if (raiz1.dato.password == password) {
                return raiz1.dato.carnet;
            } else {
                alert("CONTRASEÑA INCORRECTA");
                return "contrainc";
            }
        } else if (raiz1.dato.carnet < carnet) {
            return this.buscar(carnet, password, raiz1.derecha);
        } else {
            return this.buscar(carnet, password, raiz1.izquierda);
        }
    }

    obtenerFE(x) {
        if (x == null) {
            return -1;
        } else {
            return x.fe;
        }
    }

    //ROTACION SIMPLE IZQUIERDA
    rotacionIzq(c) {
        var aux = c.izquierda;
        c.izquierda = aux.derecha;
        aux.derecha = c;
        c.fe = Math.max(this.obtenerFE(c.izquierda), this.obtenerFE(c.derecha)) + 1;
        aux.fe = Math.max(this.obtenerFE(aux.izquierda), this.obtenerFE(aux.derecha)) + 1;
        return aux;
    }

    //ROTACION SIMPLE DERECHA
    rotacionDer(c) {
            var aux = c.derecha;
            c.derecha = aux.izquierda;
            aux.izquierda = c;
            c.fe = Math.max(this.obtenerFE(c.izquierda), this.obtenerFE(c.derecha)) + 1;
            aux.fe = Math.max(this.obtenerFE(aux.izquierda), this.obtenerFE(aux.derecha)) + 1;
            return aux;
        }
        //ROTACION DOBLE A LA IZQUIERDA

    rotacionDobleIzq(c) {
            var aux;
            c.izquierda = this.rotacionDer(c.izquierda);
            aux = this.rotacionIzq(c);
            return aux;
        }
        //ROTACION DOBLE A LA DERECHA

    rotacionDobleDer(c) {
        var aux;
        c.derecha = this.rotacionIzq(c.derecha);
        aux = this.rotacionDer(c);
        return aux;
    }

    //METODO INSERTAR AVL
    insertarAVL(nuevo, subAr) {
        var nuevoPadre = subAr;
        if (nuevo.dato.carnet < subAr.dato.carnet) {
            if (subAr.izquierda == null) {
                subAr.izquierda = nuevo;
            } else {
                subAr.izquierda = this.insertarAVL(nuevo, subAr.izquierda);
                if ((this.obtenerFE(subAr.izquierda) - this.obtenerFE(subAr.derecha)) == 2) {
                    if (nuevo.dato.carnet < subAr.izquierda.dato.carnet) {
                        nuevoPadre = this.rotacionIzq(subAr);
                    } else {
                        nuevoPadre = this.rotacionDobleIzq(subAr);
                    }
                }
            }
        } else if (nuevo.dato.carnet > subAr.dato.carnet) {
            if (subAr.derecha == null) {
                subAr.derecha = nuevo;
            } else {
                subAr.derecha = this.insertarAVL(nuevo, subAr.derecha);
                if ((this.obtenerFE(subAr.derecha) - this.obtenerFE(subAr.izquierda)) == 2) {
                    if (nuevo.dato.carnet > subAr.derecha.dato.carnet) {
                        nuevoPadre = this.rotacionDer(subAr);
                    } else {
                        nuevoPadre = this.rotacionDobleDer(subAr);
                    }
                }

            }
        } else {
            console.log("nodo duplicado :3");
        }
        //acutalizar la altura;
        if (subAr.izquierda == null && subAr.derecha != null) {
            subAr.fe = subAr.derecha.fe + 1;
        } else if (subAr.derecha == null && subAr.izquierda != null) {
            subAr.fe = subAr.izquierda.fe + 1;
        } else {
            subAr.fe = Math.max(this.obtenerFE(subAr.izquierda), this.obtenerFE(subAr.derecha)) + 1;
        }
        return nuevoPadre;
    }

    //meotod para insertar
    insertar(dato) {
        let nuevo = new nodoAVL(dato);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            this.raiz = this.insertarAVL(nuevo, this.raiz);
        }
    }
    grafico() {
            let cadena = "digraph G { \n rankdir=TB;\n node [shape = record, style=filled,fillcolor=lightpink, penwidth=3];\n"
            cadena += this.graficarNodos(this.raiz, 0)
            cadena += "}";
            return cadena
        }
        //motodo recorridos:
    preOrden(r) {
        if (r != null) {
            console.log(r.dato.carnet);
            this.preOrden(r.izquierda);
            this.preOrden(r.derecha);
        }
    }
    grafEnOrdenLR(Nodo) {
        if (Nodo == null) return "";
        let text = ""
        text += this.grafEnOrdenLR(Nodo.izquierda);
        text += '<tr><td><center>' + Nodo.dato.carnet + '</center></td><td><p style="text-align: justify">' + Nodo.dato.nombre + '</p></td></tr>\n'
        text += this.grafEnOrdenLR(Nodo.derecha);
        return text
    }
    grafPreOrdenLR(Nodo) {
        if (Nodo == null) return "";
        let text = ""
        text += '<tr><td><center>' + Nodo.dato.carnet + '</center></td><td><p style="text-align: justify">' + Nodo.dato.nombre + '</p></td></tr>\n'
        text += this.grafPreOrdenLR(Nodo.izquierda);
        text += this.grafPreOrdenLR(Nodo.derecha);
        return text
    }
    grafPostOrdenLR(Nodo) {
        if (Nodo == null) return "";
        let text = ""
        text += this.grafPostOrdenLR(Nodo.izquierda);
        text += this.grafPostOrdenLR(Nodo.derecha);
        text += '<tr><td><center>' + Nodo.dato.carnet + '</center></td><td><p style="text-align: justify">' + Nodo.dato.nombre + '</p></td></tr>\n'
        return text
    }
    graficarNodos(Nodo, number) {
        if (Nodo == null) return ""
        number++
        let cadena = ""
        cadena += this.graficarNodos(Nodo.izquierda, number);
        cadena += this.graficarNodos(Nodo.derecha, number);

        let izquierda = ""
        let derecha = ""
        if (Nodo.izquierda != null) {
            izquierda = "<C0>|";
        }
        if (Nodo.derecha != null) {
            derecha = "|<C1>"
        }
        cadena += `Nodo_${Nodo.dato.carnet}[label = "${izquierda} Id  ${Nodo.dato.carnet}, Nombre  ${Nodo.dato.nombre}, Altura  ${Nodo.fe} ${derecha}"];\n`

        if (Nodo.izquierda != null) {
            cadena += `Nodo_${Nodo.dato.carnet}:C0 -> Nodo_${Nodo.izquierda.dato.carnet};\n`
        }
        if (Nodo.derecha != null) {
            cadena += `Nodo_${Nodo.dato.carnet}:C1 -> Nodo_${Nodo.derecha.dato.carnet};\n`
        }
        return cadena
    }
    buscarinde(carnet, raiz1, NombreFolder, indice) {
        console.log(raiz1)
        if (raiz1 == null) {
            return null;
        } else if (raiz1.dato.carnet == carnet) {
            let tmp = new ArbolIndexado();
            tmp.raiz = raiz1.ArbolInde.raiz;
            tmp.raiz.id = raiz1.ArbolInde.raiz.id;
            tmp.size = raiz1.ArbolInde.size;
            raiz1.ArbolInde = tmp;
            return raiz1.ArbolInde.InsertarCa(NombreFolder, indice);
        } else if (raiz1.dato.carnet < carnet) {
            return this.buscarinde(carnet, raiz1.derecha, NombreFolder, indice);
        } else {
            return this.buscarinde(carnet, raiz1.izquierda, NombreFolder, indice);
        }
    }
    getHTMLInde(carnet, raiz1, direccion) {
        if (raiz1 == null) {
            return null;
        } else if (raiz1.dato.carnet == carnet) {
            let tmp = new ArbolIndexado();
            tmp.raiz = raiz1.ArbolInde.raiz;
            tmp.raiz.id = raiz1.ArbolInde.raiz.id;
            tmp.size = raiz1.ArbolInde.size;
            raiz1.ArbolInde = tmp;
            return raiz1.ArbolInde.getHTML(direccion);
        } else if (raiz1.dato.carnet < carnet) {
            return this.getHTMLInde(carnet, raiz1.derecha, direccion);
        } else {
            return this.getHTMLInde(carnet, raiz1.izquierda, direccion);
        }
    }
    GrafiInde(carnet, raiz1) {
        if (raiz1 == null) {
            return null;
        } else if (raiz1.dato.carnet == carnet) {
            return raiz1.ArbolInde.Graficar();
        } else if (raiz1.dato.carnet < carnet) {
            return this.GrafiInde(carnet, raiz1.derecha);
        } else {
            return this.GrafiInde(carnet, raiz1.izquierda);
        }
    }
    ObteLocalInde(carnet, raiz1) {
        if (raiz1 == null) {
            return null;
        } else if (raiz1.dato.carnet == carnet) {
            let tmp = new ArbolIndexado();
            tmp.raiz = raiz1.ArbolInde.raiz;
            tmp.raiz.id = raiz1.ArbolInde.raiz.id;
            tmp.size = raiz1.ArbolInde.size;
            raiz1.ArbolInde = tmp;
            return raiz1.ArbolInde;
        } else if (raiz1.dato.carnet < carnet) {
            return this.ObteLocalInde(carnet, raiz1.derecha);
        } else {
            return this.ObteLocalInde(carnet, raiz1.izquierda);
        }
    }
    ObteLocalIndeGet(carnet, raiz1) {
        if (raiz1 == null) {
            return null;
        } else if (raiz1.dato.carnet == carnet) {
            let tmp = new ArbolIndexado();
            tmp.raiz = raiz1.ArbolInde.raiz;
            tmp.raiz.id = raiz1.ArbolInde.raiz.id;
            tmp.size = raiz1.ArbolInde.size;
            raiz1.ArbolInde = tmp;
            let nombre = "ArbolInde" + usuario;
            let temp = localStorage.getItem(nombre);
            raiz1.ArbolInde.raiz = JSON.parse(temp).raiz;
            return "realizado";
        } else if (raiz1.dato.carnet < carnet) {
            return this.ObteLocalIndeGet(carnet, raiz1.derecha);
        } else {
            return this.ObteLocalIndeGet(carnet, raiz1.izquierda);
        }
    }
}