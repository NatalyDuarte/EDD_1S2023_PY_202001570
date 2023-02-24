package main

import (
	"Fase1/EstructCola"
	"Fase1/EstructListaDob"
	"Fase1/Usuarios"
	"bufio"
	"fmt"

	//"log"
	"os"
	"strconv"
	"strings"
	"time"
)

// declarando variables globales
var colota = EstructCola.Col{}
var listadob = EstructListaDob.ListaDobl{}

// corriendo el proyecto
func main() {
	var usuari *Usuarios.Usuario = Usuarios.NuevoEstudiante("admin", "admin", 0, "admin", "/")
	listadob.InsertarDob(usuari)
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
	var usuario, password string
	var respu string
	fmt.Println("Ingrese su Usuario: ")
	fmt.Scanln(&usuario)
	fmt.Println("Ingrese su Password: ")
	fmt.Scanln(&password)
	if usuario == "admin" && password == "admin" {
		fmt.Println("Se inicio correctamente")
		MenuAdmin()
	} else {
		fmt.Println(usuario)
		respu = listadob.Verificar(usuario, password)
		if respu != "None" {
			InicioUsuario(respu)
		}
	}
}

// Menu de Usuario
func InicioUsuario(respu string) {
	fmt.Println("====================Bienvenido: ", respu, "====================")
	GuardarPila(respu, "Inicio Sesión")
	listadob.ImprimirPila(respu)
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
			/*path, err := os.Getwd()
			if err != nil {
				log.Println(err)
			}*/
			// Escribir el archivo .dot
			//Dot.WriteDotFile(colota.Graficar(), "grafcola.dot", path)
			// Ejecutar COmando en consola
			//Dot.GeneratePNG("grafcola.dot", path)
			GuardarPila("admin", "Vio estudiantes pendientes")
			fmt.Println("=================Estudiantes pendientes:===============")
			Imprimir()
		} else if opc == 2 {
			GuardarPila("admin", "Vio estudiantes del sistema")
			listadob.ReporteJs()
			fmt.Println("=================Listado de Estudiantes:===============")
			listadob.Imprimir()
		} else if opc == 3 {
			GuardarPila("admin", "Registro Nuevo estudiante")
			RegistroUsuario()
		} else if opc == 4 {
			GuardarPila("admin", "Realizo Carga Masiva")
			CargaMasiva()
		} else if opc == 5 {
			GuardarPila("admin", "Cerro Sesion")
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
	carpe := "/"
	var usuari *Usuarios.Usuario = Usuarios.NuevoEstudiante(nombre, apellido, carnet, contrase, carpe)
	numpend = colota.Insertar(usuari)
	for {
		fmt.Println("*************Pendientes: ", numpend, " ***************")
		fmt.Println("* Estudiante actual: ", nombre, apellido)
		fmt.Println("*    1.Aceptar al Estudiante                         *")
		fmt.Println("*    2.Rechazar al Estudiante                        *")
		fmt.Println("*    3.Volver al Menu                                *")
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&opcio)
		if opcio == 1 {
			GuardarPila("admin", "Acepto estudiante")
			listadob.InsertarDob(usuari)
			colota.Eliminar(usuari)
			fmt.Println("Aceptado")
			break
		} else if opcio == 2 {
			GuardarPila("admin", "Rechazo estudiante")
			fmt.Println("Se rechazo")
			break
		} else if opcio == 3 {
			fmt.Println("Regresando....")
			break
		}
	}
}

func Imprimir() {
	var opcio int
	actual := colota.Primero
	if colota.Primero != nil {
		for actual != nil {
			fmt.Println("==============Pendiente: ", colota.Contador, " ==================")
			fmt.Println("| Estudiante actual: ", actual.Persona.Nombre, " ", actual.Persona.Apellido)
			fmt.Println("*    1.Aceptar al Estudiante                         *")
			fmt.Println("*    2.Rechazar al Estudiante                        *")
			fmt.Println("*    3.Volver al Menu                                *")
			fmt.Print("Elige una opcion: ")
			fmt.Scanln(&opcio)
			if opcio == 1 {
				GuardarPila("admin", "Acepto estudiante")
				listadob.InsertarDob(actual.Persona)
				colota.Eliminar(actual.Persona)
				fmt.Println("Aceptado")
			} else if opcio == 2 {
				GuardarPila("admin", "Rechazo estudiante")
				fmt.Println("Se rechazo")
			} else if opcio == 3 {
				fmt.Println("Regresando....")
				break
			}
			actual = actual.Siguiente
		}
	} else {
		fmt.Println(" La cola se encuentra Vacia ")
	}
}

// Metodo para realizar Carga Masiva
func CargaMasiva() {
	var ruta, nombrec, nombre, apellido, passw, carnet string
	var contador int
	var linea2 []string
	var nombrec1 []string
	fmt.Println("====================Carga Masiva:===================")
	fmt.Println("| Ingrese la ruta del archivo:                     |")
	fmt.Scanln(&ruta)
	filearchi, err := os.Open(ruta)
	if err != nil {
		fmt.Println("Hubo un error.....")
	} else {
		filescan := bufio.NewScanner(filearchi)
		filescan.Split(bufio.ScanLines)
		var lineas []string
		for filescan.Scan() {
			lineas = append(lineas, filescan.Text())
		}
		filearchi.Close()
		for _, linea := range lineas {
			linea2 = strings.Split(linea, ",")
			if contador != 0 {
				carnet = linea2[0]
				nombrec = linea2[1]
				nombrec1 = strings.Split(nombrec, " ")
				nombre = nombrec1[0]
				apellido = nombrec1[1]
				passw = linea2[2]
				carntc, err1 := strconv.Atoi(carnet)
				if err1 != nil {
					fmt.Println("Error en la conversion")
				}
				carpe := "/"
				var usuari1 *Usuarios.Usuario = Usuarios.NuevoEstudiante(nombre, apellido, carntc, passw, carpe)
				colota.Insertar(usuari1)
			}
			contador += 1
		}
		fmt.Println("Carga Masiva se cargo exitosamente")

	}
}

func GuardarPila(nombre string, actividad string) {
	var fecha, hora string
	ini := time.Now()
	month := int(ini.Month())
	fecha = strconv.Itoa(ini.Day()) + "/" + strconv.Itoa(month) + "/" + strconv.Itoa(ini.Year())
	hora = strconv.Itoa(ini.Hour()) + ":" + strconv.Itoa(ini.Minute())
	var pilan *Usuarios.Bita = Usuarios.NuevoBita(actividad, fecha, hora)
	listadob.InsertarPila(nombre, pilan)
}
