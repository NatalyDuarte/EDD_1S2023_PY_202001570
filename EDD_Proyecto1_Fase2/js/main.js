function Login() {
    var usuario = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if (usuario =="Admin" && pass=="Admin"){
        alert("Bienvenido Administrador")
        document.getElementById("HomePag").style.display = "none";   
        document.getElementById("AdminPag").style.display = "block";
        window.location.href = "#page-top";
    }
}
function CerrarAdmi() {
    alert("Cerrando Sesion Administrador....")
    document.getElementById("HomePag").style.display = "block";
    document.getElementById("AdminPag").style.display = "none";
    window.location.href = "#page-top";
}