package EstructPila

import (
	"Fase1/Dot"
	"Fase1/Usuarios"
	"fmt"
	"strconv"
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

func (pilita *Pil) Graficar() {
	nombrearch := "./grafpila.dot"
	nombreimage := "grafpila.png"
	code := "digraph G {\nlabel = \" PILA\" \nfontname=\"impact\"\nfontsize=\"25\" \nbgcolor = \"none\" \n graph [pad=\"0.1\", nodesep=\"0.1\", ranksep=\"0.1\"]; \nedge[style=invis] \n node [width=2, shape=\"record\",  style=\"filled\", color=\"black\", fillcolor=\"cadetblue1\"];\n\n"
	tmp := pilita.Primero
	i := 0
	for tmp != nil {
		code += "nodo" + strconv.Itoa(i) + " [label=\"" + tmp.Persona.Actividad + " " + tmp.Persona.Fecha + " " + tmp.Persona.Hora + "\"]\n"
		i += 1
		tmp = tmp.Siguiente
	}
	tmp = pilita.Primero
	i = 0
	code += "\n"
	for tmp != nil {
		if i == pilita.Contador {
			code += "nodo" + strconv.Itoa(i-1) + " -> nodo" + strconv.Itoa(i) + "\n"
		} else {
			code += "nodo" + strconv.Itoa(i) + " -> nodo" + strconv.Itoa(i+1) + "\n"
		}
		i += 1
		tmp = tmp.Siguiente
	}
	code += "rankdir=\"TB\"\n"
	code += "\n}"
	Dot.CrearArchivo(nombrearch)
	Dot.EscribirArchivoDot(code, nombrearch)
	Dot.Ejecutar(nombreimage, nombrearch)
}
