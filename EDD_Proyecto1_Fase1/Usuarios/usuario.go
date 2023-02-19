package Usuarios

type Usuario struct {
	Nombre   string
	Apellido string
	Carnet   int
	Password string
}

func NuevoEstudiante(nombre string, apellido string, carnet int, password string) *Usuario {
	return &Usuario{nombre, apellido, carnet, password}
}
