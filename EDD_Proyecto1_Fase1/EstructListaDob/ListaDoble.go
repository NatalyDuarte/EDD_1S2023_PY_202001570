package EstructListaDob

import (
	"Fase1/EstructPila"
	"Fase1/Usuarios"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
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
		fmt.Println(" La lista doble se encuentra Vacia ")
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
		fmt.Println(" La lista doble se encuentra Vacia ")
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
