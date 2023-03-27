let sele = document.getElementById("selCombo").value;
let Alumnos = new ArbolAVL();
$('#label-in').on('click', function() {
    $('#subiarchi').trigger('click');
});

function Login() {
    var usuario = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var respu = Alumnos.buscar(usuario, pass, Alumnos.raiz)
    if (usuario == "Admin" && pass == "Admin") {
        alert("Bienvenido Administrador")
        document.getElementById("HomePag").style.display = "none";
        document.getElementById("AdminPag").style.display = "block";
        window.location.href = "#page-top";
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    } else if (respu != null) {
        if (respu == "contrainc") {
            document.getElementById("pass").value = "";
        } else {
            alert("BIENVENIDO USUARIO")
            document.getElementById("HomePag").style.display = "none";
            document.getElementById("UsuaPag").style.display = "block";
            window.location.href = "#page-top";
            document.getElementById("user").value = "";
            document.getElementById("pass").value = "";
            var tex = '<h1 class="masthead-heading mb-0">Bienvenido</h1>'
            tex += "<h2>" + usuario + "</h2>"
            document.getElementById("nombreusua").innerHTML = tex
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

function GrafiAvl() {
    document.getElementById("Visua").style.display = "block"
    if (Alumnos.raiz != null) {
        var dot = Alumnos.grafico()
        d3.select("#Visua").graphviz()
            .width(1492)
            .height(992)
            .renderDot(dot)

    } else {
        alert("¡ NO HAY DATOS !")
    }
}