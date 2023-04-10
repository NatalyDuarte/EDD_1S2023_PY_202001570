#### Universidad San Carlos de Guatemala 
#### Estructura de Datos






# EDD_1S2023_PY_202001570
## Fase 2
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
[![carpetasmanu.png](https://i.postimg.cc/q7zkt433/carpetasmanu.png)](https://postimg.cc/p9MN4NkW)

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

# Clase ArbolIndexado: 
Contiene un archivo con javascript en cual sirve para crear la estructura de un arbol indexado, en este archivo se encuentra el nodo del arbol, su estructura y funciones las cuales son: InsertarCa, EliminarCa, getHTMLinde, etc.
[![indexado.png](https://i.postimg.cc/gcRfpZbf/indexado.png)](https://postimg.cc/BtShct6g)

# Clase Bitacora: 
Contiene un archivo con javascript en cual sirve para crear el objeto que se ultizara para la lista circular, contiene atributos como carnet, accion, fecha y hora.
[![Bitac.png](https://i.postimg.cc/W4HQNm3P/Bitac.png)](https://postimg.cc/7CSBX20B)

# Clase Usuario: 
Contiene un archivo con javascript en cual sirve para crear el objeto que se ultizara para el arbol avl, contiene atributos como carnet, nombre, carpeta_raiz, password, etc.
[![usuari.png](https://i.postimg.cc/8zk3LXfS/usuari.png)](https://postimg.cc/Ln7NpTVC)

# Clase ListaCircular: 
Contiene un archivo con javascript en cual sirve para crear la estructura de la lista circular enlazada, en este archivo se encuentra el nodo de la lista, su estructura y funciones las cuales son: InsertarCir, Imprimir y Graficar.
[![Lista-Circ.png](https://i.postimg.cc/k5zp3n1J/Lista-Circ.png)](https://postimg.cc/gwyD3PbQ)

# Clase MatrizDispersa: 
Contiene un archivo con javascript en cual sirve para crear la estructura de la matriz dispersa, en este archivo se encuentra el nodo de la matriz, su estructura y funciones las cuales son: addDispersa, GraficarDispersa, etc.
[![matriz.png](https://i.postimg.cc/QdM4FBvN/matriz.png)](https://postimg.cc/w7ScPB6n)

# Main: 
En esta clase hace la función de todas las estructuras de datos, tiene acceso al administrador y al usuario, genera reportes, hace cargas masivas, entre otros. Las funciones en esta clase son main, menú principal, menú de inicio, inicio de usuario, menú de administrador, registro de usuario, imprimir, carga masiva,etc.
[![main.png](https://i.postimg.cc/Bbgp6sg1/main.png)](https://postimg.cc/kR2K10Ln)

## Diagrama general de la aplicación:
Muestra el sistema de organización que se utilizo para desarrollar este sistema en una estructura UML de clases con ello podemos validar la fácil adaptación en caso de ser requerido a un nuevo sistema de lenguaje.
[![diagramadeclasese-drawio.png](https://i.postimg.cc/cJ38KV2X/diagramadeclasese-drawio.png)](https://postimg.cc/8F1C9n16)
