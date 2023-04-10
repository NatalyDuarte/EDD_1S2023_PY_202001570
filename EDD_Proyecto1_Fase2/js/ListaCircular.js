 class NodoCi {
     constructor(dato) {
         this.dato = dato
         this.siguiente = null
     }
 }
 class ListaCircularC {
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
             console.log(tmp.dato.accion)
             tmp = tmp.siguiente
             count++
         }
     }

     Grafici(usuario) {
         let tmp = this.primero
         let cadena = ""
         cadena += "digraph G {\n"
         for (let x = 0; x < this.size; x++) {
             if (tmp.dato.carnet == usuario) {
                 cadena += `us${x}[label = \"Accion: ${tmp.dato.accion}, Fecha: ${tmp.dato.fecha}, Hora: ${tmp.dato.hora}\ "];\n`;
             }
             tmp = tmp.siguiente
         }
         tmp = this.primero
         for (let x = 0; x < this.size; x++) {
             if (tmp.dato.carnet == usuario) {
                 if (x == this.size - 1) {
                     cadena += `us${x} -> us${0};\n`;
                 } else {
                     cadena += `us${x} -> us${x+1};\n`;
                 }
             }
         }
         cadena += "}"
         console.log(cadena)
         return cadena
     }
 }