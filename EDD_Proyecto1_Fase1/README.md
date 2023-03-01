#### Universidad San Carlos de Guatemala 
#### Estructura de Datos






# EDD_1S2023_PY_202001570
## Fase 1





#### Nataly Saraí Guzmán Duarte
#### Carnet: 202001570



## Índice 
Introducción.......................................	3
Información destacada..............................	3
Objetivos y alcances del sistema...................	4
Requerimientos..................................... 4
Datos técnicos para la realización del sistema.....	4
Lógica del programa...............................	5
Diagrama general de la aplicación.................	6

## Introducción
El presente documento se adjuntan las características, funcionamiento y estructuras que fueron requeridas para el desarrollo del sistema presentado el cual consta de un sistema de carga de información como varias funcionalidades de usuarios, también cuenta con inicio de sesión para usuarios con estructuras de datos para que este sean lo mas eficiente. 
Lugar de realización: Guatemala
Fecha: 28/02/2023
Responsable de elaboración: Nataly Saraí Guzmán Duarte


## Información destacada
El programa fue realizado utilizando como plataforma visual studio code, la realización de la fase fue de aproximadamente 1 semana, cuya realización fue separada en partes del menú, cada parte se realizo en aproximadamente 1 día su realización completa.



## Objetivos y alcances del sistema
------------------------------------
*	Dar a conocer al programada la forma en que se realizó el programa desde su inicio cuando se instaló golang, mostrando específicamente el código y explicación de porque se realizó cada bloque de código. 
*	 Realizar un programa para que como estudiante practique con el lenguaje golang. 
*	Construir aplicaciones que se ejecuten en consola creada a código y usando TDA.



## Requerimientos
*	RAM: 1 GB (mínimo). 
*	ROM: 250 MB (mínimo). 
*	Arquitectura x32 bits o x64 bits. 
*	Sistema operativo: Windows, Linux, MacOS. 
*	Lenguaje de programación: golang. 
*	Plataforma IDE: visual studio code.


## Datos técnicos para la realización del sistema
*	Windows 10 Home Single Language. 
*	Procesador: Intel Core i5. 
*	RAM: 8.00 GB 
*	Plataforma IDE: visual studio code.


## Lógica del programa
El programa está constituido por consola creada en el lenguaje de programación golang es simple e intuitivo con el usuario mostraremos a continuación las distintas clases que se usaron para su creación.
# Carpeta Dot: 
Contiene un archivo con golang en cual sirve para crear los documentos .dot y las imágenes para la creación de los reportes, cuenta con 3 funciones las cuales son crear archivo, escribir archivo .dot y ejecutar
# Carpeta EstructCola: 
Contiene un archivo con golang en cual sirve para crear la estructura de una cola, en este archivo se encuentra el nodo de la cola, su estructura y funciones las cuales son: nuevo nodo, insertar, eliminar y graficar.
# Carpeta EstructListaDoble: 
Contiene un archivo con golang en cual sirve para crear la estructura de una lista doblemente enlazada, en este archivo se encuentra el nodo de la lista, en este cuenta con un atributo que es una pila adentro de la lista por lo que se tendrán funciones para insertar la pila, su estructura y funciones las cuales son: nuevo nodo dob, insertardob, buscardob, insertar pila (a diferencia de las demás funciones en esta se busca el nombre de donde queremos agregar la pila y luego se inserta ingresándola con otra clase), imprimir pila, graficar admin, obtener nombre, imprimir, ordenamiento, verificar, reportejs, graficar doble.
# Carpeta EstructPila: 
Contiene un archivo con golang en cual sirve para crear la estructura de una pila, en este archivo se encuentra el nodo de la pila, su estructura y funciones las cuales son: nuevo nodo, insertar, imprimir y graficar.
# Carpeta Usuarios: 
Esta carpeta cuenta con dos clases, una que la de usuarios y otra que es la de la btiacora, estos son objetos que se usaran en las estructuras de datos anteriormente mencionadas, la clase de usuario tiene atributos como nombre, apellido, carnet, password, carpeta_raiz. Y la clase de bitácora tiene atributos como actividad, fecha y hora. 
# Main: 
En esta clase hace la función de todas las estructuras de datos, tiene acceso al administrador y al usuario, genera reportes, hace cargas masivas, crear individualmente un usuario, entre otros. Las funciones en esta clase son main, menú principal, menú de inicio, inicio de usuario, menú de administrador, registro de usuario, imprimir, carga masiva, guardar pila.


## Diagrama general de la aplicación:
Muestra el sistema de organización que se utilizo para desarrollar este sistema en una estructura UML de clases con ello podemos validar la fácil adaptación en caso de ser requerido a un nuevo sistema de lenguaje.
![image](https://user-images.githubusercontent.com/82484670/222013896-4b2495f7-83e4-4167-a565-73e920b72a3b.png)

