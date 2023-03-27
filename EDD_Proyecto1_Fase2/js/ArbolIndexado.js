class NAnode {
    constructor(NombreFolder) {
        this.NombreFolder = NombreFolder;
        this.ArchivosDFold = [];
        this.id = null;
    }
}
class Nario {
    constructor() {
        this.raiz = new NAnode('/');
        this.raiz.id = 0;
        this.size = 1;
    }

    insertar(NombreFolder, indice) {
        let nuevo = new NAnode(NombreFolder);
        let indicenodo = this.ObtFolder(indice);
        if (indicenodo) {
            this.size += 1;
            nuevo.id = this.size;
            indicenodo.ArchivosDFold.push(nuevo);
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

}