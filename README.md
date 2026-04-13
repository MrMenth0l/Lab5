# BlogBoard - Laboratorio 5

BlogBoard es una aplicación web modular creada con HTML, CSS y JavaScript puro. Consume la API pública DummyJSON para listar publicaciones, ver detalles, crear posts con validación, filtrar contenido y gestionar eliminación simulada en interfaz.

## Tecnologías
- HTML5
- CSS3 (arquitectura modular por componentes y páginas)
- JavaScript ES Modules (sin frameworks)
- API pública: DummyJSON

## Funcionalidades implementadas
- Listado dinámico de publicaciones con:
  - título
  - resumen
  - autor
  - botón `Ver más`
- Paginación del listado
- Vista detalle por publicación (`#/post/:id`)
- Formulario de creación con validación JavaScript:
  - título obligatorio, mínimo 5 caracteres
  - contenido obligatorio, mínimo 20 caracteres
  - autor obligatorio
- Solicitud `POST` real a la API (`/posts/add`)
- Búsqueda + 3 filtros mínimos:
  - texto
  - autor
  - tag
  - ordenamiento (extra)
- Gestión de publicaciones:
  - eliminación simulada (frontend)
- Sección adicional obligatoria:
  - `Autores` (`#/authors`)
- Estados UI visibles:
  - loading
  - success
  - error
  - empty
- Diseño responsive (desktop, tablet, mobile)

## Endpoints usados
- `GET /posts`
- `GET /posts/:id`
- `GET /users`
- `POST /posts/add`

## Navegación (hash router)
- `#/home`
- `#/post/:id`
- `#/create`
- `#/authors`

## Estructura del proyecto
```text
.
├── index.html
├── css/
│   ├── main.css
│   ├── components/
│   └── pages/
├── js/
│   ├── app/
│   ├── api/
│   ├── services/
│   ├── ui/
│   ├── utils/
│   └── features/
├── assets/
├── docs/
├── .gitignore
└── README.md
```

## Ejecución local
1. Clona el repositorio.
2. Abre `index.html` directamente en el navegador.
3. Navega entre rutas usando el menú superior.

## Notas de comportamiento
- La API DummyJSON simula escritura; por eso la eliminación se maneja localmente en estado/UI.
- Los cambios de creación y eliminación se reflejan inmediatamente en la interfaz para la demostración.

## Entrega
- Repositorio GitHub: pendiente por equipo
- Video demo: pendiente por equipo
- Integrantes: pendiente por equipo
