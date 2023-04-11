class NAnode {
    constructor(NombreFolder) {
        this.NombreFolder = NombreFolder;
        this.files = [];
        this.ArchivosDFold = [];
        this.id = null;
        this.matriz = new Matrix();
    }
}
class ArbolIndexado {
    constructor() {
        this.raiz = new NAnode('/');
        this.raiz.id = 0;
        this.size = 1;
    }

    InsertarCa(NombreFolder, indice) {
        let indicenodo = this.ObtFolder(indice);
        console.log(indicenodo.matriz)
        if (indicenodo) {
            this.size += 1;
            let res = indicenodo.ArchivosDFold.find(child => child.NombreFolder == NombreFolder);
            if (typeof res == 'undefined' || res == null) {
                let nuevo = new NAnode(NombreFolder);
                nuevo.id = this.size;
                indicenodo.ArchivosDFold.push(nuevo);
                return NombreFolder;
            } else {
                let nuevoc = new NAnode("Copia " + NombreFolder);
                nuevoc.id = this.size;
                indicenodo.ArchivosDFold.push(nuevoc);
                return "Copia " + NombreFolder;
            }
        } else {
            alert("No existe esa ruta");
        }
    }

    EliminarCar(NombreFolder, indice) {
        let indicenodo = this.ObtFolder(indice);
        if (indicenodo) {
            this.size -= 1;
            indicenodo.ArchivosDFold = indicenodo.ArchivosDFold.filter(child => child.NombreFolder !== NombreFolder);
        } else {
            alert("No existe esa ruta");
        }
    }

    ObtFolder(ruta) {
        if (ruta == this.raiz.NombreFolder) {
            return this.raiz;
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
            }
            return temp;
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
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes + '\n' + connections;
    }

    getHTML(ruta) {
        let node = this.ObtFolder(ruta);
        let code = "";
        console.log(node.ArchivosDFold)
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