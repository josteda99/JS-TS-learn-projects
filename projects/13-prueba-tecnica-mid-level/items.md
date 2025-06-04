
## Detalles
Necesitará construir las siguientes 3 páginas con React:

- Una página de "Inicio"✅
- Una página de "Series"✅
- Una página "Películas"✅

Cree componentes para cada parte de la página (por ejemplo, encabezado, contenido, pie de página, etc.). Dentro de la carpeta `/assets` podrá encontrar distintas imágenes para utilizar.

Las páginas también deben poder utilizarse en dispositivos móviles.

Puede suponer que no tiene que admitir navegadores heredados sin funciones como `fetch` o `flexbox`.


### Página de “Inicio”

> Ejemplo de referencia [screens/1-home.jpg](./screens/1-home.jpg).

Esta será su pantalla index.html.

Deberá mostrar 2 bloques que conectarán con las páginas de "Series" y "Películas".✅


### Páginas de “Serie” y “Películas”

> Ejemplo de referencia [screens/2-series.jpg](./screens/2-series.jpg) y [screens/3-movies.jpg](./screens/3-movies.jpg).

Para cada página debería leer los datos desde el archivo JSON [feed/sample.json](https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json), luego:

- Mostrar los primeros 20 resultados (`entries`). No es necesario paginar para ver más resultados. ✅
- Mostrar sólo si contienen el atributo `releaseYear` >= `2010`✅
- Ordenar los resultados por el atributo `title` de manera ascendente con órden alfanumérico✅
- Para la página de "Series" usar resultados con `programType` igual a `series`.
- Para la página de "Películas" usar resultados con `programType` igual a `movie`. ✅
- Los atributos que debes utilizar para mostrar en la caja de cada resultado son:✅
  - `title`✅
  - `images` → `Poster Art` → `url`✅
- Al posicionar el mouse sobre cada resultado la caja debe reducir su opacidad y mostrar borde blanco.✅
- Al hacer click sobre el titulo deberá abrirse un popup mostrando la información completa:✅
  - `title`✅
  - `description`✅
  - `releaseYear`✅
  - `images` → `Poster Art` → `url` ✅


### Otras consideraciones

También necesitará manejar los estados de carga/loading y error de obtener los datos desde el archivo JSON:

- Estado de "Carga/Loading" [screens/1.1-loading.jpg](./screens/1.1-loading.jpg)✅
- Estado de "Error" [screens/1.2-error.jpg](./screens/1.2-error.jpg)


#### Opcional

- Filtro por año
  - agregar arriba del listado de series/películas un input que permita filtrar películas por año.
- Paginación
  - agregar un selector de cantidad de resultados a mostrar (5, 10, 20)
  - permitir ir a próxima página de resultados o página anterior
  - permitir moverse de página en página utilizando un parámetro en la URL


## Requisitos de Stack

Para el desarrollo de la aplicación deberá utilizar:

- React / React Hooks
- Redux
- Librería de estilos (styled-components, CSS modules, o similar)
- Mobile friendly
- Unit tests (jest, react-testing-library, o similar)
- Manejo de errores
- _(opcional)_ TypeScript
- _(opcional)_ Integration/E2E tests
- _(opcional)_ Deploy automático
- _(opcional)_ ...