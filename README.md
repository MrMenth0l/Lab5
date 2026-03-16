# Laboratorio 5 - Mini Blog con DummyJSON

## Descripción
Aplicación web desarrollada con HTML, CSS y JavaScript puro para consumir la API pública DummyJSON Posts.

## Funcionalidades
- Home con listado de posts
- Búsqueda de posts por texto
- Formulario para crear posts
- UI States:
  - idle
  - loading
  - success
  - empty
  - error con botón de retry

## API utilizada
- GET /posts
- GET /posts/search?q=texto
- POST /posts/add

## Estructura
- index.html
- assets/css/styles.css
- js/app.js
- js/api/postsApi.js
- js/components/postsView.js
- js/components/createPostView.js
- js/components/uiState.js
- js/utils/helpers.js

## Instalación
1. Clonar el repositorio
2. Abrir `index.html` en el navegador

## Publicación
Se puede publicar usando GitHub Pages.

## Requisitos del laboratorio cubiertos
- HTML, CSS y JS puro
- Uso de API REST
- UI States mínimos
- Home + Crear post