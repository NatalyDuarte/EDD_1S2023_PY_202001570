package EstructCola

import (
	"Fase1/Dot"
	"Fase1/Usuarios"
	"fmt"
	"strconv"
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
				if actual == colita.Primero {
					colita.Primero = colita.Primero.Siguiente
				} else if actual == colita.Ultimo {
					anterior.Siguiente = nil
					colita.Ultimo = anterior
				} else {
					anterior.Siguiente = actual.Siguiente
				}
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

// graficar cola
func (colita *Col) Graficar() {
	var cont int
	var contenido string
	aux := colita.Primero
	nombrearch := "./grafcola.dot"
	nombreimage := "grafcola.png"
	var cadena string
	for aux != nil {
		cadena += "nodo" + strconv.Itoa(cont) + "[label= <<table  cellborder= \"0\" cellspacing=\"0\"><tr><td align=\"left\"><b>Carnet: &nbsp;</b> " + strconv.Itoa(aux.Persona.Carnet) + "</td></tr>" + "<tr><td align=\"left\"><b>Nombre: &nbsp;</b> " + aux.Persona.Nombre + " " + aux.Persona.Apellido + "</td></tr></table>>];\n"
		if aux.Siguiente != nil {
			cadena += "nodo" + strconv.Itoa(cont+1) + " -> nodo" + strconv.Itoa(cont) + ";\n"
		}
		aux = aux.Siguiente
		cont = cont + 1
	}

	contenido = "digraph G{\nbgcolor = \"none\"\nlabel=\"COLA\"\nnode [shape=plaintext fontname=\"Sans serif\" fontsize=\"8\", color=black, style=filled fillcolor=cadetblue1];\n" +
		"rankdir=LR;\n" +
		cadena +
		"\n}"
	Dot.CrearArchivo(nombrearch)
	Dot.EscribirArchivoDot(contenido, nombrearch)
	Dot.Ejecutar(nombreimage, nombrearch)
}
