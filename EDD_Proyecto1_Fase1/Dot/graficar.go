package Dot

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

func CrearArchivo(nombrearchi string) {
	var _, err = os.Stat(nombrearchi)
	if os.IsNotExist(err) {
		var file, err = os.Create(nombrearchi)
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo Creado", nombrearchi)
}

func EscribirArchivoDot(conte string, nombrearchi string) {
	var file, err = os.OpenFile(nombrearchi, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	_, err = file.WriteString(conte)
	if err != nil {
		return
	}
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo Actualizado")
}

func Ejecutar(nombre_imagen string, archivo_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tpng", archivo_dot).Output()
	mode := 0777
	_ = ioutil.WriteFile(nombre_imagen, cmd, os.FileMode(mode))
}
