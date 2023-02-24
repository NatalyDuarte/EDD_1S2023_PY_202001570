package EstructPila

import (
	"Fase1/Usuarios"
	"fmt"
)

// Aqui encontramos el nodo
type Nodo struct {
	Siguiente *Nodo
	Abajo     *Nodo
	Persona   *Usuarios.Bita
}

// Aqui se crea la Pila
type Pil struct {
	Primero  *Nodo
	Contador int
}

func NuevoNodo(usu *Usuarios.Bita) *Nodo {
	return &Nodo{nil, nil, usu}
}

func (pilita *Pil) Insertar(usu *Usuarios.Bita) {
	//Declarar nuevo nodo
	var nuevis *Nodo = NuevoNodo(usu)
	aux := pilita.Primero
	if pilita.Primero == nil {
		pilita.Primero = nuevis
	} else {
		// Inserción al inicio
		pilita.Primero = nuevis
		nuevis.Siguiente = aux
		pilita.Contador += 1
	}

}

func (pilita *Pil) Imprimir() {
	actual := pilita.Primero
	if pilita.Primero != nil {
		for actual != nil {
			fmt.Println("Fecha: ", actual.Persona.Fecha, " , Hora: ", actual.Persona.Hora)
			fmt.Println("=======================================================")
			actual = actual.Siguiente
		}
	} else {
		fmt.Println(" La Pila del Estudiante se Encuentra ")
	}
}
