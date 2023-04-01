class NAnode {
    constructor(NombreFolder) {
        this.NombreFolder = NombreFolder;
        this.ArchivosDFold = [];
        this.id = null;
        //this.matriz = new Dispersa();
    }
}
class ArbolIndexado {
    constructor() {
        this.raiz = new NAnode('/');
        this.raiz.id = 0;
        this.size = 1;
    }
    hola() {
        alert("Aqui si llego")
    }
    InsertarCa(NombreFolder, indice) {
        let nuevo = new NAnode(NombreFolder);
        let indicenodo = this.ObtFolder(indice);
        if (indicenodo) {
            this.size += 1;
            nuevo.id = this.size;
            indicenodo.ArchivosDFold.push(nuevo);
            alert("llegox2")
        } else {
            console.log("No existe esa ruta");
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

    graph() {
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
        node.ArchivosDFold.map(child => {
            code += ` <div class="col-1 folder" onclick="EntrarCarpeta('${child.NombreFolder}')">
                        <img src="../EDD_Proyecto1_Fase2/img/carpeta.png" width="100%"/>
                        <p class="h6 text-center">${child.NombreFolder}</p>
                    </div>`
        })
        return code;
    }

}