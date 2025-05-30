# Clip Code

Clip Code es una aplicación de escritorio construida con [Tauri](https://tauri.app/), [React](https://react.dev/) y [TypeScript](https://www.typescriptlang.org/) usando [Vite](https://vitejs.dev/) como bundler. Permite gestionar, crear y visualizar fragmentos de código ("snippets") con soporte para múltiples lenguajes y categorías.

## Características

- **Gestión de snippets**: Crea, visualiza y organiza fragmentos de código.
- **Soporte multilenguaje**: Selección de lenguaje para cada snippet, resaltado de sintaxis con [Monaco Editor](https://microsoft.github.io/monaco-editor/) y [Shiki](https://shiki.matsu.io/).
- **Categorías**: Agrupa lenguajes por categorías para una mejor organización.
- **Persistencia local**: Utiliza SQLite a través del plugin oficial de Tauri.
- **Interfaz moderna**: UI responsiva y oscura, construida con TailwindCSS.

## Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) (recomendado v18+)
- [Bun](https://bun.sh/) (para scripts de desarrollo)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/)
- [VS Code](https://code.visualstudio.com/) + [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) (opcional)

### Instalación

```bash
bun install
```

### Desarrollo

```bash
bun run tauri:dev
```

### Build

```bash
bun run build
bun run tauri
```

## Estructura del proyecto

- `src/`: Código fuente de React y lógica de la app.
  - `components/`: Componentes reutilizables (UI, layouts, formularios, etc).
  - `pages/`: Vistas principales (Home, Crear Snippet).
  - `lib/`: Hooks, contextos, helpers y tipos.
  - `services/`: Acceso a base de datos y servicios de negocio.
  - `styles/`: Estilos globales y configuración de Tailwind.
- `src-tauri/`: Código fuente de Tauri (Rust).
- `public/`: Recursos estáticos (iconos, fuentes).
- `package.json`: Dependencias y scripts de frontend.
- `vite.config.ts`: Configuración de Vite y alias de imports.
- `tauri.conf.json`: Configuración de la app Tauri.

## Scripts útiles

- `bun run dev`: Inicia el frontend en modo desarrollo.
- `bun run tauri:dev`: Inicia la app Tauri en modo desarrollo.
- `bun run build`: Compila el frontend para producción.
- `bun run tauri`: Compila y ejecuta la app Tauri.

## Dependencias principales

- React, React Router, TailwindCSS, Monaco Editor, Shiki, Tauri, SQLite, Fuse.js, Lucide React, Motion, Masonry-pf.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu feature/fix: `git checkout -b mi-feature`.
3. Realiza tus cambios y haz commit.
4. Haz push a tu rama y abre un Pull Request.

## Licencia

MIT

---

## Autor

Hecho por **Fran Torres** ([xindev](https://github.com/Fran-TP))

> Proyecto generado con ❤️ usando Tauri, React y TypeScript.
