# NovaSidebar

**NovaSidebar** is a lightweight library for creating responsive and dynamic sidebars in web applications. It supports submenus, active items, SPA and traditional navigation modes, and easy customization via configuration and CSS variables.

---

## Installation

Include the library and CSS files in your project:

```html
<link rel="stylesheet" href="novaSidebar.css" />
<script type="module" src="novaSidebar.js"></script>
```

---

## Configuration

### Constructor Options

| Property            | Type     | Description                                          | Default |
| ------------------- | -------- | ---------------------------------------------------- | ------- |
| `containerSelector` | `string` | Selector for the container where the sidebar renders | —       |
| `config`            | `object` | Configuration for items and header                   | `{}`    |
| `options.mode`      | `string` | Navigation mode: `'spa'` or `'navigation'`           | `'spa'` |

### Item Configuration

Each item can have:

| Property  | Type       | Description                         |
| --------- | ---------- | ----------------------------------- |
| `text`    | `string`   | Item label text                     |
| `href`    | `string`   | URL or navigation path              |
| `icon`    | `string`   | Optional icon class                 |
| `onclick` | `function` | Callback when the item is clicked   |
| `submenu` | `array`    | Array of sub-items (same structure) |
| `render`  | `function` | Custom render function for the item |

### Header Configuration

| Property   | Type     | Description       |
| ---------- | -------- | ----------------- |
| `title`    | `string` | Main title        |
| `subtitle` | `string` | Optional subtitle |

---

## Methods

| Method               | Description                      |
| -------------------- | -------------------------------- |
| `setActive(href)`    | Set an item as active by `href`  |
| `updateActive(href)` | Update the currently active item |
| `toggleMenu()`       | Open/close the sidebar on mobile |
| `closeMenu()`        | Close the sidebar on mobile      |

---

## Styles and Customization

NovaSidebar uses CSS variables for easy customization:

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

Override these variables in your project to change colors, fonts, or hover effects.

---

## Responsive

-   The sidebar automatically hides on screens smaller than 1024px and shows a toggle button.
-   Supports overlay for closing by clicking outside the sidebar.

---

## Features

-   SPA and traditional navigation
-   Nested submenus
-   Dynamic active items
-   Configurable header and footer
-   Mobile responsive with toggle
-   Customizable via CSS variables
-   Support for `onclick` and `onNavigate` callbacks

---

## Examples

### 1. SPA Example

```javascript
import { NovaSidebar } from './novaSidebar.js';

const spaSidebar = new NovaSidebar(
	'#spa-sidebar',
	{
		header: { title: 'SPA App', subtitle: 'Panel' },
		mainItems: [
			{ text: 'Home', href: '/home', icon: 'ri-home-line' },
			{ text: 'Profile', href: '/profile', icon: 'ri-user-line' },
			{ text: 'Settings', href: '/settings', icon: 'ri-settings-3-line' },
		],
	},
	{ mode: 'spa' }
);

spaSidebar.onNavigate = (path) => {
	console.log('Navigating to', path);
	document.getElementById('content').textContent = `You are at ${path}`;
};
```

---

### 2. Traditional Navigation Example

```javascript
import { NovaSidebar } from './novaSidebar.js';

const navSidebar = new NovaSidebar(
	'#nav-sidebar',
	{
		header: { title: 'Website', subtitle: 'Menu' },
		mainItems: [
			{ text: 'Home', href: '/home.html', icon: 'ri-home-line' },
			{ text: 'About', href: '/about.html', icon: 'ri-information-line' },
			{ text: 'Contact', href: '/contact.html', icon: 'ri-mail-line' },
		],
		bottomItems: [
			{ text: 'Settings', href: '/settings.html', icon: 'ri-settings-3-line' },
			{ text: 'Logout', href: '/logout.html', icon: 'ri-logout-box-line' },
		],
	},
	{ mode: 'navigation' }
);
```
