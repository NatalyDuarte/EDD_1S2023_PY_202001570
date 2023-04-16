class NodoMatriz {
    constructor(archivo, carnet, permisos) {
        this.archivo = archivo
        this.carnet = carnet
        this.permisos = permisos

        this.nextNode = null
        this.previusNode = null
        this.upNode = null
        this.downNode = null
    }
}

class NodoHeader {
    constructor(pos) {
        this.nextNode = null
        this.previusNode = null
        this.acces = null

        this.pos = pos
    }
}

class Headers {
    constructor() {
        this.rootNode = null
        this.endNode = null
        this.size = 0
    }
    isEmpty() {
        return this.rootNode == null
    }
    getHeader(pos) {
        let tmp = this.rootNode
        while (tmp != null) {
            if (tmp.pos == pos) return tmp;
            tmp = tmp.nextNode;
        }
        return null
    }
    setNode(node) {
        if (this.isEmpty()) {
            this.size++
                this.rootNode = node
        } else if (node.pos < this.rootNode.pos) {
            node.nextNode = this.rootNode
            this.rootNode.previusNode = node
            this.rootNode = node
        } else {
            let tmp = this.rootNode;
            while (tmp.nextNode != null) {
                if (node.pos < tmp.nextNode.pos) {
                    node.nextNode = tmp.nextNode
                    tmp.nextNode.previusNode = node;
                    node.previusNode = tmp
                    tmp.nextNode = node
                    break
                }
                tmp = tmp.nextNode
            }
            if (tmp.nextNode == null) {
                tmp.nextNode = node
                node.previusNode = tmp
            }
        }
    }
    insertarchivo(archivo) {
        this.size++
            let newNodo = new NodoHeader(archivo)
        if (this.rootNode == null) {
            this.rootNode = newNodo
            this.endNode = newNodo
        } else {
            this.endNode.nextNode = newNodo
            newNodo.previusNode = this.endNode
            this.endNode = newNodo
        }
    }
}

class Matrix {
    constructor() {
        this.colList = new Headers()
        this.rowList = new Headers()

    }

    insertar(archivo, carnet, permisos) {

        let newCell = new NodoMatriz(archivo, carnet, permisos);

        let columna = this.colList.getHeader(carnet);
        if (columna == null) {
            columna = new NodoHeader(carnet);
            this.colList.setNode(columna);
            columna.acces = newCell;
        } else if (archivo < columna.acces.archivo) {
            newCell.downNode = columna.acces;
            columna.acces.upNode = newCell;
            columna.acces = newCell;
        } else {
            let tmp = columna.acces;
            while (tmp.downNode != null) {
                if (newCell.archivo < tmp.downNode.archivo) {
                    newCell.downNode = tmp.downNode;
                    tmp.downNode.upNode = newCell;
                    newCell.upNode = tmp;
                    tmp.downNode = newCell
                    break;
                } else if (newCell.archivo === tmp.downNode.archivo && newCell.carnet === tmp.downNode.carnet) {
                    tmp.downNode.permisos = newCell.permisos;
                    break
                }
                tmp = tmp.downNode
            }
            if (carnet == tmp.carnet && archivo == tmp.archivo) {
                console.log("igual")
                tmp.permisos = newCell.permisos;
            } else if (tmp.downNode == null) {
                tmp.downNode = newCell;
                newCell.upNode = tmp;
            }
        }

        let row = this.rowList.getHeader(archivo);
        if (row == null) {
            row = new NodoHeader(archivo);
            this.rowList.setNode(row);
            row.acces = newCell;
        } else if (carnet < row.acces.carnet) {
            newCell.nextNode = row.acces;
            row.acces.previusNode = newCell;
            row.acces = newCell;
        } else {
            let tmp = row.acces;
            while (tmp.nextNode != null) {
                if (carnet < tmp.nextNode.carnet) {
                    newCell.nextNode = tmp.nextNode;
                    tmp.nextNode.previusNode = newCell;
                    tmp.nextNode = newCell;
                    newCell.previusNode = tmp;
                    break
                } else if (newCell.carnet === tmp.nextNode.carnet && newCell.archivo === tmp.nextNode.archivo) {
                    break
                }
                tmp = tmp.nextNode;
            }
            if (newCell.carnet === tmp.carnet && newCell.archivo === tmp.archivo) {
                console.log("igual")
            } else if (tmp.nextNode == null) {
                tmp.nextNode = newCell
                newCell.previusNode = tmp;
            }
        }
    }

    grapMatrizG(direccion) {
        let cadena = "";
        cadena += "digraph G{\n node[shape=box style=filled];\n" + "subgraph cluster_p{\n";
        cadena += 'label = "' + direccion + '"' + 'edge[dir = "both"];\n';

        cadena += this.renderNodes();

        cadena += this.nodoX();

        cadena += this.ColbyR();

        cadena += this.nodoY();

        cadena += this.RowsbyR();

        cadena += this.graphRanks();

        cadena += "}}";
        return cadena.toString()

    }
    nodoX() {
        let tmp = ""
        let aux = this.colList.rootNode
        tmp += "Carpeta -> C"
        tmp += aux.pos;
        tmp += ";\n"

        while (aux != null) {
            tmp += "C";
            tmp += aux.pos;
            tmp += "[group ="
            tmp += aux.pos;
            tmp += `, fillcolor=antiquewhite2 label ="${aux.pos}"];\n`;

            if (aux.nextNode != null) {
                tmp += "C";
                tmp += aux.pos;
                tmp += " -> C";
                tmp += aux.nextNode.pos;
                tmp += ";\n";
            }
            aux = aux.nextNode;
        }

        aux = this.colList.rootNode;
        tmp += "{ rank = same; Carpeta; ";

        while (aux != null) {
            tmp += "C";
            tmp += aux.pos;
            tmp += ";";

            aux = aux.nextNode
        }
        tmp += "}\n";
        return tmp.toString()
    }

    nodoY() {
        let tmp = "";

        let aux = this.rowList.rootNode;
        tmp += "Carpeta -> F";
        tmp += aux.pos;
        tmp += ";\n";

        while (aux != null) {
            tmp += "F";
            tmp += aux.pos;

            tmp += `[group=1, fillcolor=antiquewhite2 label="${aux.pos}"];\n`;

            if (aux.nextNode != null) {
                tmp += "F";
                tmp += aux.pos;
                tmp += " -> F";
                tmp += aux.nextNode.pos;
                tmp += ";\n";
            }
            aux = aux.nextNode;
        }
        return tmp.toString();
    }

    renderNodes() {
        let tmp = ""
        let auxc = this.colList.rootNode;
        while (auxc != null) {
            let aux = auxc.acces;
            while (aux != null) {
                tmp += "X";
                tmp += aux.archivo;
                tmp += "Y";
                tmp += aux.carnet;
                tmp += '[label="';
                tmp += aux.permisos + ",\\n " + '"';
                tmp += 'group=';
                tmp += aux.carnet;
                tmp += "];\n";

                aux = aux.downNode;
            }
            auxc = auxc.nextNode
        }
        console.log(this.colList.rootNode);
        return tmp.toString()
    }
    ColbyR() {
        let tmp = "";
        let tmp2 = "";
        let auxc = this.colList.rootNode;

        while (auxc != null) {
            if (auxc.acces != null) {
                tmp += "C";
                tmp += auxc.pos;
                tmp += " -> ";
                tmp += "X";
                tmp += auxc.acces.archivo;
                tmp += "Y";
                tmp += auxc.acces.carnet;
                tmp += ";\n";
            }
            let aux = auxc.acces;
            while (aux.downNode != null) {
                if (aux.downNode != null) {
                    tmp2 += "X";
                    tmp2 += aux.archivo;
                    tmp2 += "Y";
                    tmp2 += aux.carnet;
                    tmp2 += " -> ";
                    tmp2 += "X";
                    tmp2 += aux.downNode.archivo;
                    tmp2 += "Y";
                    tmp2 += aux.downNode.carnet;
                    tmp2 += ";\n";
                }
                aux = aux.downNode
            }
            auxc = auxc.nextNode
        }
        tmp += tmp2
        return tmp.toString();
    }
    RowsbyR() {
        let tmp = "";
        let tmp2 = "";

        let auxr = this.rowList.rootNode
        while (auxr != null) {
            if (auxr.acces != null) {
                tmp += "F";
                tmp += auxr.pos;
                tmp += " -> ";
                tmp += "X";
                tmp += auxr.acces.archivo;
                tmp += "Y";
                tmp += auxr.acces.carnet;
                tmp += ";\n";
            }
            let aux = auxr.acces;
            while (aux != null) {
                if (aux.nextNode != null) {
                    tmp2 += "X";
                    tmp2 += aux.archivo;
                    tmp2 += "Y";
                    tmp2 += aux.carnet;
                    tmp2 += " -> ";
                    tmp2 += "X";
                    tmp2 += aux.nextNode.archivo;
                    tmp2 += "Y";
                    tmp2 += aux.nextNode.carnet;
                    tmp2 += ";\n";
                }
                aux = aux.nextNode
            }
            auxr = auxr.nextNode;
        }
        tmp += tmp2
        return tmp.toString();
    }
    recorr() {
        let tmp = this.rowList.rootNode.acces
        while (tmp != null) {
            console.log(tmp)
            tmp = tmp.nextNode
        }
    }
    graphRanks() {
        let tmp = ""
        let auxr = this.rowList.rootNode
        while (auxr != null) {
            tmp += "{ rank = same; F";
            tmp += auxr.pos;
            tmp += ";";

            let aux = auxr.acces;
            while (aux != null) {
                tmp += "X";
                tmp += aux.archivo;
                tmp += "Y";
                tmp += aux.carnet;
                tmp += ";";

                aux = aux.nextNode;
            }
            tmp += "}\n";

            auxr = auxr.nextNode;
        }
        return tmp.toString();
    }
}