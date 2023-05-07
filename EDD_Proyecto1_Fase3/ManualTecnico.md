#### Universidad San Carlos de Guatemala 
#### Estructura de Datos






# EDD_1S2023_PY_202001570
## Fase 3
## Manual Tecnico




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
Fecha: 10/04/2023  
Responsable de elaboración: Nataly Saraí Guzmán Duarte


## Información destacada
El programa fue realizado utilizando como plataforma visual studio code, la realización de la fase fue de aproximadamente 3 semanas, cuya realización fue separada en partes del menú, cada parte se realizo en aproximadamente 3 día su realización completa.



## Objetivos y alcances del sistema
------------------------------------
*	Dar a conocer al programada la forma en que se realizó el programa desde su inicio cuando se instaló golang, mostrando específicamente el código y explicación de porque se realizó cada bloque de código. 
*	 Realizar un programa para que como estudiante practique con el lenguaje javascript. 
*	Construir aplicaciones que se ejecuten en consola creada a código y usando TDA.



## Requerimientos
*	RAM: 1 GB (mínimo). 
*	ROM: 250 MB (mínimo). 
*	Arquitectura x32 bits o x64 bits. 
*	Sistema operativo: Windows, Linux, MacOS. 
*	Lenguaje de programación: javascript. 
*	Plataforma IDE: visual studio code.


## Datos técnicos para la realización del sistema
*	Windows 10 Home Single Language. 
*	Procesador: Intel Core i5. 
*	RAM: 8.00 GB 
*	Plataforma IDE: visual studio code.


## Lógica del programa
El programa está constituido por consola creada en el lenguaje de programación javascript es simple e intuitivo con el usuario mostraremos a continuación las distintas clases que se usaron para su creación.  
[![carpetas.png](https://i.postimg.cc/65S9WKrX/carpetas.png)](https://postimg.cc/qzsfw9Db)

# Carpeta css: 
Contiene un archivo con .css en cual sirve para crear los estilos de la pagina html, y que se mire esteticamente bonito.  
[![imacss.png](https://i.postimg.cc/rmDCY0tw/imacss.png)](https://postimg.cc/9Rj7Dfp6)

# Carpeta img: 
Contiene todas las imagenes que se utilizaran en la realizacion de la fase.  
[![imagenes.png](https://i.postimg.cc/c1F6Jx6d/imagenes.png)](https://postimg.cc/Bt1JYGxz)

# Carpeta js: 
Contiene todos los archivos javascript, como los arboles y listas para la realizacion de la fase.

# Clase ArbolAvl: 
Contiene un archivo con javascript en cual sirve para crear la estructura de un arbol avl, en este archivo se encuentra el nodo del arbol, su estructura y funciones las cuales son: buscar, obtenerFE, rotacionIzq, rotacionDer, etc.
[![avl.png](https://i.postimg.cc/66PwSyy4/avl.png)](https://postimg.cc/CdbWnMCw)

# Clase del Grafo Dirigido: 
Contiene un archivo con javascript en cual sirve para crear la estructura del grafo dirigido, en este archivo se encuentra el nodo de la estructura, su estructura y funciones las cuales son: InsertarCa, EliminarCa, getHTMLinde, etc.
[![grafodirigifo.png](https://i.postimg.cc/PJPB9LF8/grafodirigifo.png)](https://postimg.cc/m1WXFr4b)

# Clase Usuario: 
Contiene un archivo con javascript en cual sirve para crear el objeto que se ultizara para el arbol avl, contiene atributos como carnet, nombre, carpeta_raiz, password, etc.
[![usuari.png](https://i.postimg.cc/8zk3LXfS/usuari.png)](https://postimg.cc/Ln7NpTVC)

# Clase Permisos: 
Contiene un archivo con javascript en cual sirve para crear la estructura de la lista simple enlazada, en este archivo se encuentra el nodo de la lista, su estructura y funciones las cuales son: InsertarCir, Imprimir y Graficar.
[![permisos.png](https://i.postimg.cc/mDrq1z46/permisos.png)](https://postimg.cc/B8dNdvXx)

# Clase TablaHash: 
Contiene un archivo con javascript en cual sirve para crear la estructura de la tabla hash, en este archivo se encuentra el nodo de la tabla, su estructura y funciones las cuales son: insertar, calcularindi, nuevoindi, etc.
[![tablahash.png](https://i.postimg.cc/sfWFYWSt/tablahash.png)](https://postimg.cc/Cdw6YzcN)

# Clase BlockChain: 
Contiene un archivo con javascript en cual sirve para crear la estructura del Block Chain, en este archivo se encuentra el nodo del block chain, su estructura y funciones las cuales son: insertar, encriptarAES, desencriptarAES, etc.
[![blockchain.png](https://i.postimg.cc/02ZVD5tT/blockchain.png)](https://postimg.cc/crg7NWGh)

# Main: 
En esta clase hace la función de todas las estructuras de datos, tiene acceso al administrador y al usuario, genera reportes, hace cargas masivas, entre otros. Las funciones en esta clase son main, menú principal, menú de inicio, inicio de usuario, menú de administrador, registro de usuario, imprimir, carga masiva,etc.
[![main.png](https://i.postimg.cc/Bbgp6sg1/main.png)](https://postimg.cc/kR2K10Ln)

## Diagrama general de la aplicación:
Muestra el sistema de organización que se utilizo para desarrollar este sistema en una estructura UML de clases con ello podemos validar la fácil adaptación en caso de ser requerido a un nuevo sistema de lenguaje.
[![diagrama.png](https://i.postimg.cc/pr5nTZ6V/diagrama.png)](https://postimg.cc/kR95YxCL)
