package EstructCola

import (
	"fmt"

	"Fase1/Usuarios"
)

// Aqui encontramos el nodo
type Nodo struct {
	siguiente *Nodo
	persona   *Usuarios.Usuario
}

// Aqui se crea la Cola
type Col struct {
	primero  *Nodo
	ultimo   *Nodo
	contador int
}

func NuevoCola() *Col {
	return &Col{nil, nil, 0}
}
func NuevoNodo(usu *Usuarios.Usuario) *Nodo {
	return &Nodo{nil, usu}
}

func Insertar(usu *Usuarios.Usuario, colita *Col) int {
	//Declarar nuevo nodo
	var nuevis *Nodo = NuevoNodo(usu)
	//Verificar si la lista está vacía
	if colita.primero == nil {
		colita.primero = nuevis
	} else {
		//Recorrer hasta encontrar el último nodo
		temp := colita.primero
		for temp.siguiente != nil {
			temp = temp.siguiente
		}
		//Agregar el nuevo nodo hasta el final
		temp.siguiente = nuevis
	}
	colita.contador += 1
	fmt.Println("Usuario inresado correctamente")
	return colita.contador
}

// Metodo para imprimir la cla
func Imprimir(colita *Col) {
	aux := colita.primero
	if colita.primero != nil {
		for aux != nil {
			fmt.Println(" ", aux.persona.Nombre)
			aux = aux.siguiente
		}
	} else {
		fmt.Println(" La cola se encuentra Vacia ")

	}
}
