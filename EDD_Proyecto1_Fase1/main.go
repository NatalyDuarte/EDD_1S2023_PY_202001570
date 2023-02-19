package main

import (
	"Fase1/EstructCola"
	"Fase1/EstructListaDob"
	"Fase1/Usuarios"
	"fmt"
)

// declarando variables globales
var usuario, password string
var colota *EstructCola.Col = EstructCola.NuevoCola()
var listadob *EstructListaDob.ListaDobl = EstructListaDob.NuevoListDob()

// corriendo el proyecto
func main() {
	MenuPrincipal()

}

// Menu de inicio
func MenuPrincipal() {
	var opc int
	for {
		fmt.Println("=======================EDD GoDrive=======================")
		fmt.Println("|   1. Iniciar Sesión                                   |")
		fmt.Println("|   2. Salir del Sistema                                |")
		fmt.Println("=========================================================")
		fmt.Println("Elige una opcion: ")
		fmt.Scanln(&opc)
		if opc == 1 {
			MenuInicio()
		} else if opc == 2 {
			fmt.Println("Feliz día")
			break
		} else {
			fmt.Println("Esa no es una opcion!")
		}
	}
}

// Menu de inicio de sesion
func MenuInicio() {
	fmt.Println("Ingrese su Usuario: ")
	fmt.Scanln(&usuario)
	fmt.Println("Ingrese su Password: ")
	fmt.Scanln(&password)
	if usuario == "admin" && password == "admin" {
		fmt.Println("Se inicio correctamente")
		MenuAdmin()
	}
}

// Menu de Administrador
func MenuAdmin() {
	var opc int
	for {
		fmt.Println("=========Dashboard Administrador - EDD GoDrive==========")
		fmt.Println("|   1. Ver Estudiantes Pendientes                      |")
		fmt.Println("|   2. Ver Estudiantes del Sistema                     |")
		fmt.Println("|   3. Registrar Nuevo Estudiante                      |")
		fmt.Println("|   4. Carga Masiva de Estudiantes                     |")
		fmt.Println("|   5. Cerrar Sesion                                   |")
		fmt.Println("========================================================")
		fmt.Println("Elige una opcion: ")
		fmt.Scanln(&opc)
		if opc == 1 {
			EstructCola.Imprimir(colota)
		} else if opc == 2 {
			fmt.Println("Feliz día")
			break
		} else if opc == 3 {
			RegistroUsuario()
		} else if opc == 4 {
			fmt.Println("Feliz día")
			break
		} else if opc == 5 {
			fmt.Println("Cerrando Sesion........")
			break
		} else {
			fmt.Println("Esa no es una opcion!")
		}
	}
}

// Registrar Nuevo Usuario
func RegistroUsuario() {
	var nombre, apellido, contrase string
	var carnet, numpend, opcio int
	fmt.Println("=========Registro De Estudiantes - EDD GoDrive==========")
	fmt.Println("Ingrese su Nombre: ")
	fmt.Scanln(&nombre)
	fmt.Println("Ingrese su Apellido: ")
	fmt.Scanln(&apellido)
	fmt.Println("Ingrese su Carnet: ")
	fmt.Scanln(&carnet)
	fmt.Println("Ingrese la Contraseña: ")
	fmt.Scanln(&contrase)
	var usuari *Usuarios.Usuario = Usuarios.NuevoEstudiante(nombre, apellido, carnet, contrase)
	numpend = EstructCola.Insertar(usuari, colota)
	for {
		fmt.Println("*************Pendientes: ", numpend, " ***************")
		fmt.Println("* Estudiante actual: ", nombre, apellido)
		fmt.Println("*    1.Aceptar al Estudiante                         *")
		fmt.Println("*    2.Rechazar al Estudiante                        *")
		fmt.Println("*    3.Volver al Menu                                *")
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&opcio)
		if opcio == 1 {
			EstructListaDob.InsertarDob(usuari, listadob)
			fmt.Println("Aceptado")
			break
		} else if opcio == 2 {
			fmt.Println("Se rechazo")
			break
		} else if opcio == 3 {
			fmt.Println("Regresando....")
			break
		}
	}
}
