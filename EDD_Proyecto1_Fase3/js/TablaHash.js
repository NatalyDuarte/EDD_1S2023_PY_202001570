class NodoHash {
    constructor(carnet, nombre, password, carpeta_raiz) {
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;
        this.carpeta_raiz = carpeta_raiz;
    }
}
class TableHash {
    constructor() {
        this.table = new Array(7);
        this.capacidad = 7;
        this.usados = 0;
    }

    // Metodo de insertar 
    insertar(carnet, nombre, password, carpeta_raiz) {
        let indice = this.calcuindi(carnet);
        let nuevo = new NodoHash(carnet, nombre, password, carpeta_raiz);
        if (indice < this.capacidad) {
            if (this.table[indice] == null) {
                this.table[indice] = nuevo;
                this.usados++;
            } else {
                let contador = 1;
                indice = this.recalcuindi(carnet, contador);
                while (this.table[indice] != null) {
                    contador++;
                    indice = this.recalcuindi(carnet, contador);
                }
                this.table[indice] = nuevo;
                this.usados++;
            }
            this.revicapa();
        }
    }

    calcuindi(carnet) {
        let carne = carnet.toString();
        let sum = 0;
        for (let i = 0; i < carne.length; i++) {
            sum += carne.charCodeAt(i);
        }
        let posicion = sum % this.capacidad;
        return posicion;
    }

    recalcuindi(carnet, contador) {
        let indice = this.calcuindi(carnet) + (contador * contador);
        let nuevo = this.nuevoindi(indice);
        return nuevo;
    }

    nuevoindi(indice) {
        let pos = 0;
        if (indice < this.capacidad) {
            pos = indice;
        } else {
            pos = indice - this.capacidad;
            pos = this.nuevoindi(pos);
        }
        return pos;
    }

    revicapa() {
        const utilizacion = this.capacidad * 0.75;
        if (this.usados > utilizacion) {
            this.capacidad = this.nuevacapa();
            this.usados = 0;
            const temp = this.table;
            this.table = new Array(this.capacidad);
            temp.forEach(std => {
                this.insertar(std.carnet, std.nombre, std.password);
            });
        }

    }

    nuevacapa() {
        let num = this.capacidad + 1;
        while (!this.Primo(num)) {
            num++;
        }
        return num;
    }

    Primo(num) {
        if (num <= 1) { return false }
        if (num === 2) { return true }
        if (num % 2 === 0) { return false }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) { return false };
        }
        return true;
    }

    buscar(carnet) {
        let indice = this.calcuindi(carnet);
        if (indice < this.capacidad) {
            try {
                if (this.table[indice] != null && this.table[indice].carnet === carnet) {
                    return this.table[indice];
                } else {
                    let contador = 1;
                    indice = this.recalcuindi(carent, contador);
                    while (this.table[indice] != null) {
                        contador++;
                        indice = this.recalcuindi(carent, contador);
                        if (this.table[indice].carnet === carnet) {
                            return this.table[indice].carnet;
                        }
                    }
                }
            } catch (err) {
                console.log("Error ", err);
            }
        }
        return null;
    }
}