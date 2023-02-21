package EstructCola

import (
	"Fase1/Usuarios"
	"fmt"
)

// Aqui encontramos el nodo
type Nodo struct {
	Siguiente *Nodo
	Persona   *Usuarios.Usuario
}

// Aqui se crea la Cola
type Col struct {
	Primero  *Nodo
	Ultimo   *Nodo
	Contador int
}

func NuevoNodo(usu *Usuarios.Usuario) *Nodo {
	return &Nodo{nil, usu}
}

func (colita *Col) Insertar(usu *Usuarios.Usuario) int {
	//Declarar nuevo nodo
	var nuevis *Nodo = NuevoNodo(usu)
	aux := colita.Primero
	if colita.Primero == nil {
		colita.Primero = nuevis
	} else {
		for aux.Siguiente != nil {
			aux = aux.Siguiente
		}
		aux.Siguiente = nuevis
	}
	colita.Contador += 1
	fmt.Println("Usuario ingresado correctamente")
	return colita.Contador
}

// Metodo para eliminar
func (colita *Col) Eliminar(usu *Usuarios.Usuario) {
	actual := colita.Primero
	var anterior *Nodo = nil
	var encontrado bool = false
	if colita.Primero != nil {
		for actual != nil && encontrado != true {
			if actual.Persona.Nombre == usu.Nombre {
				fmt.Println(" Nodo con el dato ( ", usu.Nombre, " ) Encontrado")
				if actual == colita.Primero {
					colita.Primero = colita.Primero.Siguiente
				} else if actual == colita.Ultimo {
					anterior.Siguiente = nil
					colita.Ultimo = anterior
				} else {
					anterior.Siguiente = actual.Siguiente
				}
				fmt.Println("Nodo Eliminado")
				colita.Contador -= 1
				encontrado = true
			}
			anterior = actual
			actual = actual.Siguiente
		}
		if !encontrado {
			fmt.Println("Nodo No Encontrado")
		}
	} else {
		fmt.Println(" La cola se encuentra Vacia ")
	}
}
