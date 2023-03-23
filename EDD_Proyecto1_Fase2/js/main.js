let sele = document.getElementById("selCombo").value;

function Login() {
    var usuario = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var respu = Alumnos.buscar(usuario, pass, Alumnos.raiz)
    if (usuario == "Admin" && pass == "Admin") {
        alert("Bienvenido Administrador")
        document.getElementById("HomePag").style.display = "none";
        document.getElementById("AdminPag").style.display = "block";
        window.location.href = "#page-top";
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    } else if (respu != null) {
        if (respu == "contrainc") {
            document.getElementById("pass").value = "";
        } else {
            alert("BIENVENIDO USUARIO")
            document.getElementById("HomePag").style.display = "none";
            document.getElementById("UsuaPag").style.display = "block";
            window.location.href = "#page-top";
            document.getElementById("user").value = "";
            document.getElementById("pass").value = "";
            var tex = '<h1 class="masthead-heading mb-0">Bienvenido</h1>'
            tex += "<h2>" + usuario + "</h2>"
            document.getElementById("nombreusua").innerHTML = tex
        }
    } else if (respu == null) {
        alert("CARNET INCORRECTO.")
    }
}

function CerrarAdmi() {
    alert("Cerrando Sesion Administrador....")
    document.getElementById("HomePag").style.display = "block";
    document.getElementById("AdminPag").style.display = "none";
    window.location.href = "#page-top";
}

function ObtenerSele() {
    var sele = document.getElementById("selCombo").value;
    if (sele == "In-Orden") {
        document.getElementById("TablaInOrder").style.display = "block";
        document.getElementById("TablaPostOrder").style.display = "none";
        document.getElementById("TablaPreOrder").style.display = "none";
        let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th></tr></thead><tbody>\n'
        text += Alumnos.grafEnOrdenLR(Alumnos.raiz)
        text += "</tbody></table>"
        document.getElementById("TablaInOrder").innerHTML = text
    } else if (sele == "Post-Orden") {
        document.getElementById("TablaInOrder").style.display = "none";
        document.getElementById("TablaPostOrder").style.display = "block";
        document.getElementById("TablaPreOrder").style.display = "none";
        let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th></tr></thead><tbody>\n'
        text += Alumnos.grafPostOrdenLR(Alumnos.raiz)
        text += "</tbody></table>"
        document.getElementById("TablaPostOrder").innerHTML = text
    } else if (sele == "Pre-Orden") {
        document.getElementById("TablaInOrder").style.display = "none";
        document.getElementById("TablaPostOrder").style.display = "none";
        document.getElementById("TablaPreOrder").style.display = "block";
        let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th></tr></thead><tbody>\n'
        text += Alumnos.grafPreOrdenLR(Alumnos.raiz)
        text += "</tbody></table>"
        document.getElementById("TablaPreOrder").innerHTML = text
    }
}

function CargaEstu() {
    var documento = document.getElementById('cargamasi').files[0]
    if (documento) {
        let reader2 = new FileReader();
        reader2.onload = function(e) {
            let contenido2 = e.target.result;
            let data = JSON.parse(contenido2)
            for (i in data) {
                let fila = data[i]
                for (u in fila) {
                    var nuevo = new Usuario(fila[u].nombre, fila[u].carnet, fila[u].password, fila[u].Carpeta_Raiz);
                    Alumnos.insertar(nuevo);
                }
            }
            alert("¡ ARCHIVO JSON ESTUDIANTES LEIDO !")
            document.getElementById("TablaInOrder").style.display = "block";
            document.getElementById("TablaPostOrder").style.display = "none";
            document.getElementById("TablaPreOrder").style.display = "none";
            let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th></tr></thead><tbody>\n'
            text += Alumnos.grafEnOrdenLR(Alumnos.raiz)
            text += "</tbody></table>"
            document.getElementById("TablaInOrder").innerHTML = text
        }
        reader2.readAsText(documento);
    } else {
        alert("¡ ERROR ARCHIVO NO LEIDO !")
    }

}

function GrafiAvl() {
    document.getElementById("Visua").style.display = "block"
    if (Alumnos.raiz != null) {
        var dot = Alumnos.grafico()
        d3.select("#Visua").graphviz()
            .width(1492)
            .height(992)
            .renderDot(dot)

    } else {
        alert("¡ NO HAY DATOS !")
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
        var nuevo = new nodoAVL(dato);
        if (this.raiz == null) {
            this.raiz = nuevo;
        } else {
            this.raiz = this.insertarAVL(nuevo, this.raiz);
        }
    }
    grafico() {
            var texto = "digraph grafica{\nrankdir=TB;\nnode[shape=box, style=filled, fillcolor=lightpink, penwidth=3]\n"
            if (this.raiz != null) {
                texto += this.raiz.textoGraphviz();
            }
            texto += "\n}"
            return texto
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
}

let Alumnos = new ArbolAVL();