package EstructListaDob

import (
	"fmt"

	"Fase1/Usuarios"
)

// Aqui encontramos el nodo
type NodoD struct {
	Siguiente *NodoD
	Atras     *NodoD
	Persona   *Usuarios.Usuario
}

// Aqui se crea la Lista Doble
type ListaDobl struct {
	Primero  *NodoD
	Ultimo   *NodoD
	Contador int
}

func NuevoNodoDob(usu *Usuarios.Usuario) *NodoD {
	return &NodoD{nil, nil, usu}
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
	fmt.Println("Usuario ingresado correctamente a la lista enlazada doble")
}

// Metodo para imprimir la lista
func (listat *ListaDobl) Imprimir() {
	actual := listat.Primero
	if listat.Primero != nil {
		listat.Ordenamiento()
		for actual != nil {
			fmt.Println("Nombre: ", actual.Persona.Nombre, " ", actual.Persona.Apellido, " , Carnet: ", actual.Persona.Carnet)
			fmt.Println("=======================================================")
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
