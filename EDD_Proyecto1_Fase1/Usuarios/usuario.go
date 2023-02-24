package Usuarios

type Usuario struct {
	Nombre       string
	Apellido     string
	Carnet       int
	Password     string
	Carpeta_Raiz string
}

func NuevoEstudiante(nombre string, apellido string, carnet int, password string, carpeta_raiz string) *Usuario {
	return &Usuario{nombre, apellido, carnet, password, carpeta_raiz}
}
