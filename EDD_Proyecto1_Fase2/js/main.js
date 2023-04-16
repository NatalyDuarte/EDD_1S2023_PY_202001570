let sele = document.getElementById("selCombo").value;
let Alumnos = new ArbolAVL();
let usuario;
let localusua;
let usuarioob;
let fechaActual = new Date();
let usuarioacti;
let selpermisos;
let contax = 0;
let contay = 0;

$('#label-in').on('click', function() {
    $('#subiarchi').trigger('click');
});

function Login() {
    usuario = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    usuarioob = Alumnos.buscar(usuario, Alumnos.raiz)
    if (usuario == "Admin" && pass == "Admin") {
        alert("Bienvenido Administrador")
        document.getElementById("HomePag").style.display = "none";
        document.getElementById("AdminPag").style.display = "block";
        window.location.href = "#page-top";
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    } else if (usuarioob != null) {
        if (usuarioob.password == pass) {
            alert("BIENVENIDO USUARIO")
            console.log(usuarioob)
            usuarioacti = new Usuaob(usuarioob.nombre, usuarioob.carnet, usuarioob.password, usuarioob.carpeta_raiz);
            document.getElementById("HomePag").style.display = "none";
            document.getElementById("UsuaPag").style.display = "block";
            window.location.href = "#page-top";
            document.getElementById("user").value = "";
            document.getElementById("pass").value = "";
            var tex = '<h1 class="masthead-heading mb-0">Bienvenido</h1>'
            tex += "<h2>" + usuario + "</h2>"
            document.getElementById("nombreusua").innerHTML = tex
            VerLocalArbolInde();
            //VerLocalBitacora();

        } else {
            document.getElementById("pass").value = "";
            alert("Contraseña Incorrecta")
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
            localStorage.setItem("CargaMasiva", JSON.stringify(Alumnos))
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

function VerLocalCargaMasiva() {
    let temp = localStorage.getItem("CargaMasiva")
    Alumnos.raiz = JSON.parse(temp).raiz;
    let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th></tr></thead><tbody>\n'
    text += Alumnos.grafEnOrdenLR(Alumnos.raiz)
    text += "</tbody></table>"
    document.getElementById("TablaInOrder").innerHTML = text
}

function GrafiAvl() {
    document.getElementById("Visua").style.display = "block"
    if (Alumnos.raiz != null) {
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G {\n node [shape = record, style=filled,fillcolor=lightpink, penwidth=3];\n ${Alumnos.Grafi()} }`
        $("#graph").attr("src", url + body);
        console.log(url + body)
    } else {
        alert("¡ NO HAY DATOS !")
    }
}

function CrearCarpeta() {
    let NombreCarpe = document.getElementById("nomcarpeta").value;
    let direccion = document.getElementById("direccarpeta").value;
    // let nombr = Alumnos.buscarinde(usuario, Alumnos.raiz, NombreCarpe, direccion)
    const fecha = fechaActual.toLocaleDateString();
    const hora = fechaActual.toLocaleTimeString();
    //var nuevo = new Usuario(usuarioob.nombre, usuarioob.carnet, usuarioob.password, usuarioob.carpeta_raiz);
    let nombr = usuarioacti.getindex(NombreCarpe, direccion);
    //nuevo.getindex();
    var nuevo = new Bitacora(usuario, "Se creo carpeta " + nombr, fecha, hora);
    usuarioacti.InsertarCir(nuevo);
    alert("Carpeta creada exitosamente");
    let text = usuarioacti.getHTMLInde(direccion);
    document.getElementById("areadecarp").innerHTML = text;
    document.getElementById("nomcarpeta").value = "";
}

function EliminarCarpeta() {
    let NombreCarpe = document.getElementById("nomcarpeta").value;
    let direccion = document.getElementById("direccarpeta").value;
    usuarioacti.eliminde(NombreCarpe, direccion);
    const fecha = fechaActual.toLocaleDateString();
    const hora = fechaActual.toLocaleTimeString();
    var nuevo = new Bitacora(usuario, "Se elimino carpeta " + NombreCarpe, fecha, hora);
    usuarioacti.InsertarCir(nuevo);
    alert("Carpeta eliminada exitosamente");
    let text = usuarioacti.getHTMLInde(direccion);
    document.getElementById("areadecarp").innerHTML = text;
    document.getElementById("nomcarpeta").value = "";
}

function EntrarCarpeta(NombreFolder) {
    let direccion = document.getElementById("direccarpeta").value;
    let direcam = direccion == '/' ? direccion + NombreFolder : direccion + "/" + NombreFolder;
    document.getElementById("direccarpeta").value = direcam;
    let text = usuarioacti.getHTMLInde(direcam);
    document.getElementById("areadecarp").innerHTML = text;
}

function BuscarCarpeta() {
    let direccion = document.getElementById("direccarpeta").value;
    let resp = usuarioacti.buscacar(direccion);
    if (resp == null) {
        alert("El directorio no es valido")
    } else {
        document.getElementById("direccarpeta").value = direccion;
        document.getElementById("areadecarp").innerHTML = direccion;
    }
}

function RetornarInicio() {
    document.getElementById("direccarpeta").value = "/";
    let text = usuarioacti.getHTMLInde("/");
    document.getElementById("areadecarp").innerHTML = text;
}

function GrafiInde() {
    document.getElementById("Visua1").style.display = "block"
    if (Alumnos.raiz != null) {
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G {\n node [shape = record, style=filled,fillcolor=lightpink, penwidth=3];\n  ${usuarioacti.GrafiInde()} }`
        $("#graph1").attr("src", url + body);
        console.log(url + body)
        localusua = usuarioacti.ObteLocalInde();
        let nombre = "ArbolInde" + usuario;
        localStorage.setItem(nombre, JSON.stringify(localusua));
    } else {
        alert("¡ NO HAY DATOS !")
    }
}

function VerLocalArbolInde() {
    let res = usuarioacti.ObteLocalIndeGet(usuario);
    if (res == "realizado") {
        let direccion = document.getElementById("direccarpeta").value;
        let text1 = usuarioacti.getHTMLInde(direccion);
        document.getElementById("areadecarp").innerHTML = text1;
    }
}

function BorrarLocal() {
    localStorage.clear()
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const SubirArchivo = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let direccion = document.getElementById("direccarpeta").value;
    let nombe = "";
    if (form.file.type === 'text/plain') {
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => {
            nombe = usuarioacti.InsertarArchi(direccion, form.fileName, fr.result, form.file.type)
            let text = usuarioacti.getHTMLInde(direccion);
            document.getElementById("areadecarp").innerHTML = text;
            const fecha = fechaActual.toLocaleDateString();
            const hora = fechaActual.toLocaleTimeString();
            var nuevo = new Bitacora(usuario, "Se creo archivo " + nombe, fecha, hora);
            usuarioacti.InsertarCir(nuevo);
        };
    } else {
        let parseBase64 = await toBase64(form.file);
        nombe = usuarioacti.InsertarArchi(direccion, form.fileName, parseBase64, form.file.type)
        let text = usuarioacti.getHTMLInde(direccion);
        document.getElementById("areadecarp").innerHTML = text;
        const fecha = fechaActual.toLocaleDateString();
        const hora = fechaActual.toLocaleTimeString();
        var nuevo = new Bitacora(usuario, "Se creo archivo " + nombe, fecha, hora);
        usuarioacti.InsertarCir(nuevo);
    }
    alert('Archivo Subido!')
}

function GenePermisos() {
    let direccion = document.getElementById("direccarpeta").value;
    var permisoscarne = document.getElementById("fileCarne").value;
    var nombrearchi = document.getElementById("fileName").value;
    alert("Se genero permiso: " + selpermisos + " al carnet: " + permisoscarne + " del archivo: " + nombrearchi)
    usuarioacti.InsertarMatri(direccion, nombrearchi, permisoscarne, selpermisos);
}

function GrafiBita() {
    document.getElementById("Visua2").style.display = "block"
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = usuarioacti.Graficir();
    $("#graph2").attr("src", url + body);
    console.log(url + body)
        //localStorage.setItem("Bitacora", JSON.stringify(bita));
}

function VerLocalBitacora() {
    let temp = localStorage.getItem("Bitacora");
    bita = JSON.parse(temp);
}

function CerrarUsua() {
    alert("Cerrando Sesion Usuario....")
    document.getElementById("HomePag").style.display = "block";
    document.getElementById("UsuaPag").style.display = "none";
    window.location.href = "#page-top";
    $("#graph1").attr("src", " ");
    $("#graph2").attr("src", " ");
    $("#graph3").attr("src", " ");
    document.getElementById("fileName").value = " ";
    document.getElementById("file").value = " ";
    document.getElementById("fileCarne").value = " ";
    selpermisos = " ";
    usuarioacti = " ";
    usuarioob = " ";
}

function ObtenerSelePermisos() {
    var sele = document.getElementById("selComboper").value;
    if (sele == "Ning") {
        selpermisos = " "
    } else if (sele == "LosDos") {
        selpermisos = "r-w"
    } else if (sele == "Leer") {
        selpermisos = "r"
    } else if (sele == "Escribir") {
        selpermisos = "w"
    }
}

function GrafiMatri() {
    document.getElementById("Visua3").style.display = "block";
    let direccion = document.getElementById("direccarpeta").value;
    if (Alumnos.raiz != null) {
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = usuarioacti.GrafiMatri(direccion);
        $("#graph3").attr("src", url + body);
        console.log(url + body)
            /*
            localusua = usuarioacti.ObteLocalMatri();
            let nombre = "Matri" + direccion;
            localStorage.setItem(nombre, JSON.stringify(localusua));*/
    } else {
        alert("¡ NO HAY DATOS !")
    }
}

function VerLocalMatri() {
    usuarioacti.ObteLocalMatriGet(usuario);
}

$(document).ready(VerLocalCargaMasiva);