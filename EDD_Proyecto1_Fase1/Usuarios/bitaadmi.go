package Usuarios

type Bita struct {
	Actividad string
	Fecha     string
	Hora      string
}

func NuevoBita(actividad string, fecha string, hora string) *Bita {
	return &Bita{actividad, fecha, hora}
}
