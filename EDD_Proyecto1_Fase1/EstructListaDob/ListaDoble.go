package EstructListaDob

import (
	"Fase1/Dot"
	"Fase1/EstructPila"
	"Fase1/Usuarios"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

var arch, arch1, arch2, archjunto string

// Aqui encontramos el nodo
type NodoD struct {
	Siguiente *NodoD
	Atras     *NodoD
	Pilita    *EstructPila.Pil
	Persona   *Usuarios.Usuario
}

// Aqui se crea la Lista Doble
type ListaDobl struct {
	Primero  *NodoD
	Ultimo   *NodoD
	Contador int
}

func NuevoNodoDob(usu *Usuarios.Usuario) *NodoD {
	return &NodoD{nil, nil, &EstructPila.Pil{}, usu}
}
func (listat *ListaDobl) InsertarDob(usu *Usuarios.Usuario) {
	//Declarar nuevo nodo
	var nuevis *NodoD = NuevoNodoDob(usu)
	//Verificar si la lista está vacía
	if listat.Primero == nil {
		listat.Primero = nuevis
		listat.Primero.Siguiente = nil
		listat.Primero.Atras = nil
		listat.Ultimo = listat.Primero
		listat.Contador += 1
	} else {
		listat.Ultimo.Siguiente = nuevis
		nuevis.Siguiente = nil
		nuevis.Atras = listat.Ultimo
		listat.Ultimo = nuevis
		listat.Contador += 1
	}
}

func (listat *ListaDobl) BuscarNodo(carnt int) bool {
	actual := listat.Primero
	var encontrado = false
	if listat.Primero != nil {
		for actual != nil && encontrado != true {
			if actual.Persona.Carnet == carnt {
				encontrado = true
			}
			actual = actual.Siguiente
		}
	}
	return encontrado
}

func (listat *ListaDobl) InsertarPila(nombre string, usu *Usuarios.Bita) {
	auxLis := listat.Primero
	if listat.Primero != nil {
		for auxLis != nil {
			if auxLis.Persona.Nombre == nombre {
				auxLis.Pilita.Insertar(usu)
			}
			auxLis = auxLis.Siguiente
		}
	} else {
		fmt.Println(" La Pila se encuentra Vacia ")
	}
}

func (listat *ListaDobl) ImprimirPila(nombre string) {
	auxLis := listat.Primero
	if listat.Primero != nil {
		for auxLis != nil {
			if auxLis.Persona.Nombre == nombre {
				auxLis.Pilita.Imprimir()
			}
			auxLis = auxLis.Siguiente
		}
	} else {
		fmt.Println(" La Pila se encuentra Vacia ")
	}
}

func (listat *ListaDobl) GraficarAdmin(nombre string) {
	auxLis := listat.Primero
	if listat.Primero != nil {
		for auxLis != nil {
			if auxLis.Persona.Nombre == nombre {
				auxLis.Pilita.Graficar()
			}
			auxLis = auxLis.Siguiente
		}
	} else {
		fmt.Println(" La Pila se encuentra Vacia ")
	}
}

func (listat *ListaDobl) ObtNombre(nombre string) *NodoD {
	aux := listat.Primero
	if listat.Primero != nil {
		for aux != nil {
			if aux.Persona.Nombre == nombre {
				return aux
			}
			aux = aux.Siguiente
		}
		return nil
	} else {
		fmt.Println(" La lista doble se encuentra Vacia ")
	}
	return nil
}

// Metodo para imprimir la lista
func (listat *ListaDobl) Imprimir() {
	actual := listat.Primero
	if listat.Primero != nil {
		listat.Ordenamiento()
		for actual != nil {
			if actual.Persona.Nombre != "admin" {
				fmt.Println("Nombre: ", actual.Persona.Nombre, " ", actual.Persona.Apellido, " , Carnet: ", actual.Persona.Carnet)
				fmt.Println("=======================================================")
			}
			actual = actual.Siguiente
		}
	} else {
		fmt.Println(" La lista doble se encuentra Vacia ")
	}
}

// Metodo de ordenamiento de burbujas
func (listat *ListaDobl) Ordenamiento() {
	comprobar := listat.Primero
	aux := listat.Primero
	if comprobar.Siguiente != nil && aux != nil {
		i := listat.Primero
		for i != nil {
			j := i.Siguiente
			for j != nil {
				if i.Persona.Carnet > j.Persona.Carnet {
					tmp := i.Persona
					i.Persona = j.Persona
					j.Persona = tmp
				}
				j = j.Siguiente
			}
			i = i.Siguiente
		}
	}
}

// Metodo para verificar si es un usuario
func (listat *ListaDobl) Verificar(nombre string, passw string) string {
	var nom string
	var encontrado bool = false
	comprobar := listat.Primero
	if listat.Primero != nil {
		for comprobar != nil && encontrado != true {
			if comprobar.Persona.Nombre == nombre {
				nom = nombre
				encontrado = true
			}
			comprobar = comprobar.Siguiente
		}
		if !encontrado {
			nom = "None"
		}

	} else {
		nom = "None"
	}
	return nom
}

// Reporte Json
func (listat *ListaDobl) ReporteJs() {
	actual := listat.Primero
	if listat.Primero != nil {
		listat.Ordenamiento()
		for actual != nil {
			if actual.Persona.Nombre != "admin" {
				if actual.Siguiente == nil {
					prubjs := Usuarios.Usuario{
						Nombre:       actual.Persona.Nombre,
						Apellido:     actual.Persona.Apellido,
						Carnet:       actual.Persona.Carnet,
						Password:     actual.Persona.Password,
						Carpeta_Raiz: "/",
					}
					dat, err := json.Marshal(prubjs)
					if err != nil {
						log.Fatal(err)
					}
					arch += string(dat) + "\n"
				} else {
					prubjs := Usuarios.Usuario{
						Nombre:       actual.Persona.Nombre,
						Apellido:     actual.Persona.Apellido,
						Carnet:       actual.Persona.Carnet,
						Password:     actual.Persona.Password,
						Carpeta_Raiz: "/",
					}
					dat, err := json.Marshal(prubjs)
					if err != nil {
						log.Fatal(err)
					}
					arch += string(dat) + ",\n"
				}
			}
			actual = actual.Siguiente
		}
		arch1 = "{\n \"alumnos\":[\n"
		arch2 = "]\n}"
		archjunto = arch1 + arch + arch2
		err := ioutil.WriteFile("ReporteJSON.json", []byte(archjunto), 0644)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Se genero reporte correctamente")
	} else {
		fmt.Println(" La lista doble se encuentra Vacia ")
	}

}

func (listat *ListaDobl) Graficadoble() {
	tmp := listat.Primero
	nombrearch := "./graflistadoble.dot"
	nombreimage := "graflistadoble.png"
	var dot = "digraph G{\nbgcolor = \"none\"\nlabel=\"Reporte de lista enlazada doble\";\nnode[shape=box, color=black, style=filled fillcolor=cadetblue1]\n"
	var conexion = "{rank=same;\n"
	var dot2 = ""
	var conexion2 = ""
	var num = 0
	for tmp != nil {
		if tmp.Persona.Nombre != "admin" {
			dot += "N" + strconv.Itoa(num) + "[label=\"" + tmp.Persona.Nombre + " " + tmp.Persona.Apellido + " " + strconv.Itoa(tmp.Persona.Carnet) + "\", ];\n"
			var tem = tmp.Pilita.Primero
			var nu = 0
			if tmp.Pilita != nil {
				for tem != nil {
					dot2 += "n" + strconv.Itoa(num) + strconv.Itoa(nu) + "[label=\"" + tem.Persona.Actividad + " " + tem.Persona.Fecha + " " + tem.Persona.Hora + "\",color=black, style=filled fillcolor=cornsilk];\n"
					if tem.Siguiente != nil {
						var aux = nu + 1
						conexion2 += "n" + strconv.Itoa(num) + strconv.Itoa(nu) + " -> n" + strconv.Itoa(num) + strconv.Itoa(aux) + ";\n"
					}
					tem = tem.Siguiente
					nu += 1
				}
				conexion2 += "N" + strconv.Itoa(num) + " -> n" + strconv.Itoa(num) + "0"
				dot += dot2 + "\n" + conexion2 + "\n"
				conexion2 = ""
				dot2 = ""
			}
			if tmp.Siguiente != nil {
				var auxn = num + 1
				conexion += "N" + strconv.Itoa(num) + " -> N" + strconv.Itoa(auxn) + ";\n"
				conexion += "N" + strconv.Itoa(auxn) + " -> N" + strconv.Itoa(num) + ";\n"
			} else {

			}
			num += 1
		}
		tmp = tmp.Siguiente

	}
	dot += "\n" + conexion + "}\n"
	dot += "}"
	Dot.CrearArchivo(nombrearch)
	Dot.EscribirArchivoDot(dot, nombrearch)
	Dot.Ejecutar(nombreimage, nombrearch)

}
