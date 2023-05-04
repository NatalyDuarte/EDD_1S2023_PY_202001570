class NodeBloc {
    constructor(index, transmitter, receiver, message, previusHash, hash) {
        this.Index = index;
        this.Timestamp = new Date();
        this.Transmitter = transmitter;
        this.Receiver = receiver;
        this.Message = message;
        this.PreviusHash = previusHash;
        this.Hash = hash;
        this.siguiente = null;
        this.anterior = null;
    }
    FormatoFecha() {
        let day = this.Timestamp.getDate();
        let month = this.Timestamp.getMonth();
        let year = this.Timestamp.getFullYear();
        let hours = this.Timestamp.getHours();
        let min = this.Timestamp.getMinutes();
        let sec = this.Timestamp.getSeconds();
        return `${day}-${month}-${year} :: ${hours}:${min}:${sec}`;
    }
}
let keyBytes = "";
class BlockChain {
    constructor() {
            this.inicio = null;
            this.final = null;
            this.size = 0;
        }
        // Metodo para Insertar
    async Insertar(Transmitter, Receiver, Message) {
        // Generar una clave AES de 256 bits
        let key = await window.crypto.subtle.generateKey({ name: "AES-CBC", length: 256 },
            true, ["encrypt", "decrypt"]
        );
        // Obtener los bytes de la clave
        keyBytes = await window.crypto.subtle.exportKey("raw", key);
        let nuevo = new NodeBloc(this.size, Transmitter, Receiver, Message, "", "");
        if (this.inicio == null) {
            nuevo.PreviusHash = "00000";
            nuevo.Message = await this.encryptAES(nuevo.Message, keyBytes)
            nuevo.Hash = await this.ObSha256(nuevo.Index + nuevo.Timestamp + nuevo.Transmitter + nuevo.Receiver + nuevo.Message);
            this.inicio = nuevo;
            this.final = nuevo;
            this.size++;
        } else {
            nuevo.PreviusHash = this.final.Hash;
            nuevo.Message = await this.encryptAES(nuevo.Message, keyBytes)
            nuevo.Hash = await this.ObSha256(nuevo.Index + nuevo.Timestamp + nuevo.Transmitter + nuevo.Receiver + nuevo.Message);
            this.final.siguiente = nuevo;
            nuevo.anterior = this.final;
            this.final = nuevo;
            this.size++;
        }
    }

    async encryptAES(block, key) {
        let str = JSON.stringify(block).toString();
        let bytes = new TextEncoder().encode(str);

        // Generar una clave AES a partir de la clave proporcionada
        let aesKey = await window.crypto.subtle.importKey(
            "raw",
            key, { name: "AES-CBC" },
            false, ["encrypt"]
        );

        // Generar un vector de inicialización aleatorio
        let iv = window.crypto.getRandomValues(new Uint8Array(16));

        // Cifrar los bytes utilizando AES en modo CBC
        let encryptedBytes = await window.crypto.subtle.encrypt({ name: "AES-CBC", iv },
            aesKey,
            bytes
        );

        // Concatenar el vector de inicialización y los bytes cifrados
        let combinedBytes = new Uint8Array(iv.length + encryptedBytes.byteLength);
        combinedBytes.set(iv);
        combinedBytes.set(new Uint8Array(encryptedBytes), iv.length);

        // Convertir los bytes cifrados en una cadena hexadecimal
        let encryptedHex = Array.prototype.map
            .call(combinedBytes, x => ("00" + x.toString(16)).slice(-2))
            .join("");

        return encryptedHex;
    }

    async decryptAES(encryptedHex, key) {
        // Convertir la cadena hexadecimal cifrada en bytes
        let encryptedBytes = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Obtener el vector de inicialización del comienzo de los bytes cifrados
        let iv = encryptedBytes.slice(0, 16);

        // Obtener los bytes cifrados sin el vector de inicialización
        let ciphertext = encryptedBytes.slice(16);

        // Generar una clave AES a partir de la clave proporcionada
        let aesKey = await window.crypto.subtle.importKey(
            "raw",
            key, { name: "AES-CBC" },
            false, ["decrypt"]
        );

        // Descifrar los bytes utilizando AES en modo CBC
        let decryptedBytes = await window.crypto.subtle.decrypt({ name: "AES-CBC", iv },
            aesKey,
            ciphertext
        );

        // Decodificar los bytes descifrados en una cadena
        let decryptedStr = new TextDecoder().decode(decryptedBytes);

        // Parsear la cadena JSON resultante en un objeto
        let decryptedBlock = JSON.parse(decryptedStr);

        return decryptedBlock;
    }


    // Metodo para obtener sha256
    async ObSha256(block) {
            let str = JSON.stringify(block).toString();
            let bytes = new TextEncoder().encode(str);
            let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
            let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
            return hash;
        }
        // METODO PARA IMPRIMIR EN CONSOLA
    Imprimir() {
        if (this.inicio !== null) {
            let temp = this.inicio;
            while (temp !== null) {
                console.log(temp);
                temp = temp.siguiente;
            }
        }
    }

    async ObMensajes(Transmitter, Receiver) {
        if (this.inicio !== null) {
            let msgs = "";
            let temp = this.inicio;
            while (temp !== null) {
                if (String(temp.Receiver) === String(Transmitter)) {
                    if (String(temp.Transmitter) === String(Receiver)) {
                        let mensaje = await this.decryptAES(temp.Message, keyBytes);
                        console.log(mensaje)
                        msgs += `<li class="list-group-item">` + mensaje + `</li>`;
                    }
                } else if (String(temp.Transmitter) === String(Transmitter)) {
                    if (String(temp.Receiver) === String(Receiver)) {
                        let mensaje1 = await this.decryptAES(temp.Message, keyBytes);
                        console.log(mensaje1)
                        msgs += `<li class="list-group-item bg-primary text-light" style="text-align: right">` + mensaje1 + `</li>`;
                    }
                }
                temp = temp.siguiente;
            }
            console.log(msgs)
            if (msgs) {
                return `
                    <ul class="list-group">
                        ${msgs}
                    </ul>
                `;
            }
        }
        return "No hay mensajes";
    }
    GraficaBlockChain(Index = 0) {
        if (this.inicio) {
            let temp = this.inicio;
            while (temp !== null) {
                if (temp.Index === Index) {
                    return `
                        <table class="table table-bordered" id="block-table" name="${temp.Index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-9">${temp.Index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${temp.FormatoFecha()}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmitter</th>
                                    <td>${temp.Transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${temp.Receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td>${temp.Message}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Previus Hash</th>
                                    <td>${temp.PreviusHash}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash del Bloque</th>
                                    <td>${temp.Hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                } else {
                    temp = temp.siguiente;
                }
            }
        }
        return "";
    }
    GrafiBloc() {
        let tmp = this.inicio
        let cadena = ""
        for (let x = 0; x < this.size; x++) {
            cadena += `us${x}[label = \"TimeStamp= ${tmp.FormatoFecha()}, Emisor: ${tmp.Transmitter}, Receptor: ${tmp.Receiver}, Previoushash: ${tmp.PreviusHash }\ "];\n`;
            tmp = tmp.siguiente
        }
        tmp = this.primero
        for (let x = 0; x < this.size; x++) {
            if (x == this.size - 1) {
                cadena += `us${x};\n`;
            } else {
                cadena += `us${x} -> us${x+1};\n`;
            }
        }
        return cadena
    }
}