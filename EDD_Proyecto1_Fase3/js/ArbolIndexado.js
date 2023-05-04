class NAnode {
    constructor(NombreFolder, peso) {
        this.NombreFolder = NombreFolder;
        this.files = [];
        this.ArchivosDFold = [];
        this.id = null;
        this.peso = peso;
    }
}
class ArbolIndexado {
    constructor() {
        this.raiz = new NAnode('/', 1);
        this.raiz.id = 0;
        this.size = 1;
    }

    InsertarCa(NombreFolder, indice) {
        let { node: nodopadre, peso } = this.ObtFolder(indice);
        if (nodopadre) {
            this.size += 1;
            let res = nodopadre.ArchivosDFold.find(child => child.NombreFolder == NombreFolder);
            if (typeof res == 'undefined' || res == null) {
                let nuevo = new NAnode(NombreFolder, peso);
                nuevo.id = this.size;
                nodopadre.ArchivosDFold.push(nuevo);
                return NombreFolder;
            } else {
                let nuevoc = new NAnode("Copia " + NombreFolder, peso);
                nuevoc.id = this.size;
                nodopadre.ArchivosDFold.push(nuevoc);
                return "Copia " + NombreFolder;
            }
        } else {
            alert("No existe esa ruta");
        }
    }

    EliminarCar(NombreFolder, indice) {
        let { node: indicenodo, peso } = this.ObtFolder(indice);
        if (indicenodo) {
            this.size -= 1;
            indicenodo.ArchivosDFold = indicenodo.ArchivosDFold.filter(child => child.NombreFolder !== NombreFolder);
            peso--;
        } else {
            alert("No existe esa ruta");
        }
    }

    ObtFolder(ruta) {
        let peso = 2;
        if (ruta == this.raiz.NombreFolder) {
            return { node: this.raiz, peso: peso };
        } else {
            let temp = this.raiz;
            let folders = ruta.split('/');
            folders = folders.filter(str => str !== '');
            let folder = null;
            while (folders.length > 0) {
                let carpeta = folders.shift()
                folder = temp.ArchivosDFold.find(child => child.NombreFolder == carpeta);
                if (typeof folder == 'undefined' || folder == null) {
                    return null;
                }
                temp = folder;
                peso++;
            }
            return { node: temp, peso: peso };
        }
    }

    Graficar() {
        let nodes = "";
        let connections = "";

        let node = this.raiz;
        let queue = [];
        queue.push(node);
        while (queue.length !== 0) {
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.NombreFolder}"];\n`;
                node.ArchivosDFold.forEach(item => {
                    connections += `S_${node.id} -> S_${item.id} [label="${node.peso}"];\n`
                    queue.push(item);
                });
            }
        }
        return '\nlayout=neato; \nedge[dir=none];\n' + nodes + '\n' + connections;
    }

    getHTML(ruta) {
        let { node } = this.ObtFolder(ruta);
        let code = "";
        node.ArchivosDFold.map(child => {
            code += ` <div class="col-2 folder" onclick="EntrarCarpeta('${child.NombreFolder}')">
                        <img src="../EDD_Proyecto1_Fase2/img/carpeta.png" width="100%"/>
                        <p class="h6 text-center">${child.NombreFolder}</p>
                    </div>`
        })
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], { type: file.type });
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="../EDD_Proyecto1_Fase2/img/archivo.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            } else {
                code += ` <div class="col-2 folder">
                        <img src="../EDD_Proyecto1_Fase2/img/archivo.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }

}