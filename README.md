# PDF Page Counter

Aplicación sencilla para contar los archivos de pdf de un directorio dado.

Solo es necesario seleccionar el directorio raiz que se pretende escanear, la aplicación dará como resultado 3 datos:

- **Páginas**: El conteo **Total** de páginas de todos los archivos PDF en el directorio
- **Archivos**: El conteo **Total** de archivos dentro del directorio seleccionado
- **Directorios**: El conteo de directorios **directos dentro de la raíz seleccionada**

Es decir que si se tiene un esquema ejemplo:

- Raíz
  - Ejemplo 01
  - Ejemplo 02
    - Subdirectorio 01
  - Ejemplo 03

Solo los directorios **Ejemplo** serán contabilizados, y cualquier directorio en el esquema de **Subdirectorio** o en niveles inferiores, serán ignorados para el conteo de **Directorios**

Los respectivos creditos para:
[pdf-parse](https://gitlab.com/autokent/pdf-parse)