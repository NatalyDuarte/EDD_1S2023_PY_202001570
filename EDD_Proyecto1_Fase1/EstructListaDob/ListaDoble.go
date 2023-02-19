package EstructListaDob

import (
	"fmt"

	"Fase1/Usuarios"
)

// Aqui encontramos el nodo
type NodoD struct {
	siguiente *NodoD
	atras     *NodoD
	persona   *Usuarios.Usuario
}

// Aqui se crea la Lista Doble
type ListaDobl struct {
	primero  *NodoD
	ultimo   *NodoD
	contador int
}

func NuevoListDob() *ListaDobl {
	return &ListaDobl{nil, nil, 0}
}
func NuevoNodoDob(usu *Usuarios.Usuario) *NodoD {
	return &NodoD{nil, nil, usu}
}
func InsertarDob(usu *Usuarios.Usuario, listat *ListaDobl) {
	//Declarar nuevo nodo
	var nuevis *NodoD = NuevoNodoDob(usu)
	//Verificar si la lista está vacía
	if listat.primero == nil {
		listat.primero = nuevis
		listat.primero.siguiente = nil
		listat.primero.atras = nil
		listat.ultimo = listat.primero
		listat.contador += 1
	} else {
		listat.ultimo.siguiente = nuevis
		nuevis.siguiente = nil
		nuevis.atras = listat.ultimo
		listat.ultimo = nuevis
		listat.contador += 1
	}
	fmt.Println("Usuario ingresado correctamente a la lista enlazada doble")

}
