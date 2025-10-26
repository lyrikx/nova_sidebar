# NovaSidebar

**NovaSidebar** es una librería ligera para crear barras laterales (sidebars) responsivas y dinámicas en aplicaciones web. Soporta submenús, items activos, modos SPA y de navegación tradicional, y permite una fácil personalización mediante configuración y variables CSS.

---

## Instalación

Incluye los archivos de la librería y el CSS en tu proyecto:

```html
<link rel="stylesheet" href="novaSidebar.css" />
<script type="module" src="novaSidebar.js"></script>
```

---

## Configuración

### Opciones del constructor

| Propiedad           | Tipo     | Descripción                                           | Default |
| ------------------- | -------- | ----------------------------------------------------- | ------- |
| `containerSelector` | `string` | Selector del contenedor donde se renderiza el sidebar | —       |
| `config`            | `object` | Configuración de items y header                       | `{}`    |
| `options.mode`      | `string` | Modo de navegación: `'spa'` o `'navigation'`          | `'spa'` |

### Configuración de items

Cada item puede tener:

| Propiedad | Tipo       | Descripción                                   |
| --------- | ---------- | --------------------------------------------- |
| `text`    | `string`   | Texto del item                                |
| `href`    | `string`   | URL o ruta de navegación                      |
| `icon`    | `string`   | Clase de icono opcional                       |
| `onclick` | `function` | Callback al hacer click                       |
| `submenu` | `array`    | Array de sub-items (misma estructura)         |
| `render`  | `function` | Función personalizada para renderizar el item |

### Configuración del header

| Propiedad  | Tipo     | Descripción        |
| ---------- | -------- | ------------------ |
| `title`    | `string` | Título principal   |
| `subtitle` | `string` | Subtítulo opcional |

---

## Métodos

| Método               | Descripción                                   |
| -------------------- | --------------------------------------------- |
| `setActive(href)`    | Establece un item como activo mediante `href` |
| `updateActive(href)` | Actualiza el item actualmente activo          |
| `toggleMenu()`       | Abre o cierra el sidebar en móvil             |
| `closeMenu()`        | Cierra el sidebar en móvil                    |

---

## Estilos y personalización

NovaSidebar utiliza variables CSS para facilitar la personalización:

```css
:root {
	--nova-sidebar-font: system-ui, sans-serif;
	--nova-sidebar-border: #e5e7eb;
	--nova-sidebar-bg: #fff;
	--nova-sidebar-bg-hover: #f1f5ff;
	--nova-sidebar-text: #374151;
	--nova-sidebar-active-bg: #e3e8ff;
	--nova-sidebar-active-text: #2f3ec9;
}
```

Puedes sobrescribir estas variables en tu proyecto para cambiar colores, fuentes o efectos hover.

---

## Responsive

-   El sidebar se oculta automáticamente en pantallas menores a 1024px y muestra un botón de toggle.
-   Soporta overlay para cerrar al hacer click fuera del sidebar.

---

## Características

-   SPA y navegación tradicional
-   Submenús anidados
-   Items activos dinámicos
-   Header y footer configurables
-   Responsive con toggle para móviles
-   Personalizable mediante variables CSS
-   Soporte para callbacks `onclick` y `onNavigate`

---

## Ejemplos

### 1. Ejemplo SPA

```javascript
import { NovaSidebar } from './novaSidebar.js';

const spaSidebar = new NovaSidebar(
	'#spa-sidebar',
	{
		header: { title: 'App SPA', subtitle: 'Panel' },
		mainItems: [
			{ text: 'Inicio', href: '/home', icon: 'ri-home-line' },
			{ text: 'Perfil', href: '/profile', icon: 'ri-user-line' },
			{ text: 'Configuración', href: '/settings', icon: 'ri-settings-3-line' },
		],
	},
	{ mode: 'spa' }
);

spaSidebar.onNavigate = (path) => {
	console.log('Navegando a', path);
	document.getElementById('content').textContent = `Estás en ${path}`;
};
```

---

### 2. Ejemplo Navegación Tradicional

```javascript
import { NovaSidebar } from './novaSidebar.js';

const navSidebar = new NovaSidebar(
	'#nav-sidebar',
	{
		header: { title: 'Sitio Web', subtitle: 'Menú' },
		mainItems: [
			{ text: 'Inicio', href: '/home.html', icon: 'ri-home-line' },
			{ text: 'Acerca de', href: '/about.html', icon: 'ri-information-line' },
			{ text: 'Contacto', href: '/contact.html', icon: 'ri-mail-line' },
		],
		bottomItems: [
			{ text: 'Configuración', href: '/settings.html', icon: 'ri-settings-3-line' },
			{ text: 'Cerrar sesión', href: '/logout.html', icon: 'ri-logout-box-line' },
		],
	},
	{ mode: 'navigation' }
);
```
