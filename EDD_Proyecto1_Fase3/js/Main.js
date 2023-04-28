let Alumnos = new ArbolAVL();
let Permisos = new ListaPermisos();
let usuario;
let localusua;
let usuarioob;
let usuarioacti;
let selpermisos;
let contax = 0;
let contay = 0;
let permisoscarnet;
let mensajecarnet;
let sele = document.getElementById("selCombo").value;
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
        document.getElementById("TablaPermisos").style.display = "block";
        let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>PROPIETARIO</center></th><th scope="col"><center>DESTINO</center></th><th scope="col"><center>UBICACION</center></th><th scope="col"><center>ARCHIVO</center></th><th scope="col"><center>PERMISOS</center></th></tr></thead><tbody>\n'
        text += Permisos.GrafTabla();
        text += "</tbody></table>"
        document.getElementById("TablaPermisos").innerHTML = text
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
            let selec = Alumnos.grafEnOrdenSelect(Alumnos.raiz);
            $('#selCarnetPer').append(selec);
            $('#selCarnetMen').append(selec);
        } else {
            document.getElementById("pass").value = "";
            alert("Contraseña Incorrecta")
        }
    } else if (respu == null) {
        alert("CARNET INCORRECTO.")
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

function CargaTabla() {
    Alumnos.EnOrdenHash(Alumnos.raiz);
    document.getElementById("TablaUsua").style.display = "block";
    let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th><th scope="col"><center>CONTRASEÑA</center></th></tr></thead><tbody>\n'
    text += Alumnos.graphHash();
    text += "</tbody></table>"
    document.getElementById("TablaUsua").innerHTML = text
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

function CrearCarpeta() {
    let NombreCarpe = document.getElementById("nomcarpeta").value;
    let direccion = document.getElementById("direccarpeta").value;
    usuarioacti.getindex(NombreCarpe, direccion);
    alert("Carpeta creada exitosamente");
    let text = usuarioacti.getHTMLInde(direccion);
    document.getElementById("areadecarp").innerHTML = text;
    document.getElementById("nomcarpeta").value = "";
}

function EliminarCarpeta() {
    let NombreCarpe = document.getElementById("nomcarpeta").value;
    let direccion = document.getElementById("direccarpeta").value;
    usuarioacti.eliminde(NombreCarpe, direccion);
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
        };
    } else {
        let parseBase64 = await toBase64(form.file);
        nombe = usuarioacti.InsertarArchi(direccion, form.fileName, parseBase64, form.file.type)
        let text = usuarioacti.getHTMLInde(direccion);
        document.getElementById("areadecarp").innerHTML = text;
    }
    alert('Archivo Subido!')
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
    if (sele == "LosDos") {
        selpermisos = "r-w"
    } else if (sele == "Leer") {
        selpermisos = "r"
    } else if (sele == "Escribir") {
        selpermisos = "w"
    }
}

function ObtenerSeleCarPermisos() {
    permisoscarnet = document.getElementById("selCarnetPer").value;
}

function ObtenerSeleCarMen() {
    mensajecarnet = document.getElementById("selCarnetMen").value;
}

function VerLocalCargaMasiva() {
    let temp = localStorage.getItem("CargaMasiva")
    Alumnos.raiz = JSON.parse(temp).raiz;
    let text = '<table class="table table-striped"><thead><tr><th scope="col"><center>CARNET</center></th><th scope="col"><center>NOMBRE</center></th></tr></thead><tbody>\n'
    text += Alumnos.grafEnOrdenLR(Alumnos.raiz)
    text += "</tbody></table>"
    document.getElementById("TablaInOrder").innerHTML = text
}

function GenePermisos() {
    let direccion = document.getElementById("direccarpeta").value;
    var nombrearchi = document.getElementById("fileName").value;
    alert("Se genero permiso: " + selpermisos + " al carnet: " + permisoscarnet + " del archivo: " + nombrearchi)
    let nuevo = new Permi(usuarioacti.carnet, permisoscarnet, direccion, nombrearchi, selpermisos);
    Permisos.InsertCir(nuevo);
}


$(document).ready(VerLocalCargaMasiva);