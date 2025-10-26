const arrowSvg = `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M33.934,54.458l30.822,27.938c0.383,0.348,0.864,0.519,1.344,0.519c0.545,0,1.087-0.222,1.482-0.657 c0.741-0.818,0.68-2.083-0.139-2.824L37.801,52.564L64.67,22.921c0.742-0.818,0.68-2.083-0.139-2.824 c-0.817-0.742-2.082-0.679-2.824,0.139L33.768,51.059c-0.439,0.485-0.59,1.126-0.475,1.723 C33.234,53.39,33.446,54.017,33.934,54.458z"></path> </g> </g></svg>`

export class NovaSidebar {

	constructor(containerSelector, config = {}, options = {}) {

		this.container = document.querySelector(containerSelector);
		
		if (!this.container) throw new Error(`NovaSidebar: No se encontró el contenedor ${containerSelector}`);

		this.config = config;
		this.mode = options.mode || 'spa';
		this.isOpen = false;
		this.currentPath = window.location.pathname;

		this.overlay = null;
		this.sidebar = null;
		this.toggleBtn = null;
		this.bodyWrapper = null;

		this.currentActive = null;

		this.render();

	}

	render() {

		this.container.classList.add('nova-sidebar-layout');
		this.container.innerHTML = '';

		this.sidebar = document.createElement('aside');
		this.sidebar.className = 'nova-sidebar';

		// Header
		if (this.config.header) {

			const header = document.createElement('div');

			header.className = 'nova-sidebar-header';
			header.innerHTML = `
				<div class="nova-sidebar-title">${this.config.header.title || ''}</div>
				${this.config.header.subtitle ? `<div class="nova-sidebar-subtitle">${this.config.header.subtitle}</div>` : ''}
			`;

			this.sidebar.appendChild(header);

		}

		// Main items
		const content = document.createElement('div');
		content.className = 'nova-sidebar-content';

		if (Array.isArray(this.config.mainItems)) {
			const mainList = document.createElement('ul');
			mainList.className = 'nova-sidebar-items';
			this.config.mainItems.forEach((item) => mainList.appendChild(this.createItem(item)));
			content.appendChild(mainList);
		}
		
		this.sidebar.appendChild(content);

		// Bottom items
		if (Array.isArray(this.config.bottomItems)) {
			const bottomList = document.createElement('ul');
			bottomList.className = 'nova-sidebar-bottom';
			this.config.bottomItems.forEach((item) => bottomList.appendChild(this.createItem(item)));
			this.sidebar.appendChild(bottomList);
		}

		// Overlay
		this.overlay = document.createElement('div');
		this.overlay.className = 'nova-sidebar-overlay';
		this.overlay.addEventListener('click', () => this.closeMenu());

		// Toggle
		this.toggleBtn = document.createElement('button');
		this.toggleBtn.className = 'nova-sidebar-toggle';
		this.toggleBtn.innerHTML = '☰';
		this.toggleBtn.addEventListener('click', () => this.toggleMenu());

		// Wrapper
		this.bodyWrapper = document.createElement('div');
		this.bodyWrapper.className = 'nova-sidebar-body';
		this.bodyWrapper.appendChild(this.sidebar);

		this.container.appendChild(this.toggleBtn);
		this.container.appendChild(this.bodyWrapper);
		this.container.appendChild(this.overlay);

		// Responsive
		window.addEventListener('resize', this.debounce(() => this.updateResponsive(), 150));
		this.updateResponsive();
	}

	createItem(item) {
		const li = document.createElement('li');
		li.className = 'nova-sidebar-item';
		li.dataset.href = item.href || '';

		const hasSubmenu = Array.isArray(item.submenu);
		const isActive = this.currentPath === item.href;
		if (isActive) {
			li.classList.add('active');
			this.currentActive = li;
		}

		const btn = document.createElement('button');
		btn.className = 'nova-sidebar-link';
		if (typeof item.render === 'function') {
			btn.appendChild(item.render(item));
		} else {
			btn.innerHTML = `
				${item.icon ? `<i class="${item.icon}"></i>` : ''}
				<span>${item.text}</span>
				${hasSubmenu ? `<i class="submenu-arrow">${arrowSvg}</i>` : ''}
			`;
		}

		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			if (hasSubmenu) this.toggleSubmenu(li);
			else this.handleItemClick(item);
		});

		li.appendChild(btn);

		if (hasSubmenu) {
			const submenu = document.createElement('ul');
			submenu.className = 'nova-submenu';
			item.submenu.forEach((sub) => submenu.appendChild(this.createSubItem(sub)));
			li.appendChild(submenu);
		}

		return li;
	}

	createSubItem(sub) {
		const subLi = document.createElement('li');
		subLi.className = 'nova-subitem';
		subLi.dataset.href = sub.href || '';
		if (this.currentPath === sub.href) subLi.classList.add('active');

		const btn = document.createElement('button');
		btn.className = 'nova-subitem-link';
		if (typeof sub.render === 'function') {
			btn.appendChild(sub.render(sub));
		} else {
			btn.textContent = sub.text;
		}

		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			this.handleItemClick(sub);
		});

		subLi.appendChild(btn);
		return subLi;
	}

	handleItemClick(item) {
		if (typeof item.onclick === 'function') item.onclick(item);

		if (item.href) {
			this.updateActive(item.href);
			if (this.mode === 'navigation') window.location.href = item.href;
			else if (this.mode === 'spa' && typeof this.onNavigate === 'function') this.onNavigate(item.href);
		}

		this.closeMenu();
	}

	toggleSubmenu(li) {
		li.classList.toggle('open');
		const arrow = li.querySelector('.submenu-arrow');
		if (arrow) arrow.innerHTML = li.classList.contains('open') ? `${arrowSvg}` : `${arrowSvg}`;
	}

	toggleMenu() {
		this.isOpen = !this.isOpen;
		this.container.classList.toggle('open', this.isOpen);
		this.overlay.style.display = this.isOpen ? 'block' : 'none';
	}

	closeMenu() {
		this.isOpen = false;
		this.container.classList.remove('open');
		if (this.overlay) this.overlay.style.display = 'none';
	}

	updateResponsive() {
		const isMobile = window.innerWidth < 1024;
		this.container.classList.toggle('mobile', isMobile);
		if (!isMobile) this.closeMenu();
	}

	updateActive(href) {
		if (this.currentActive) this.currentActive.classList.remove('active');

		const li = this.sidebar.querySelector(`[data-href="${href}"]`);
		if (!li) return;

		li.classList.add('active');
		this.currentActive = li;

		const parentItem = li.closest('.nova-sidebar-item');
		if (parentItem) parentItem.classList.add('open');
	}

	setActive(href) {
		this.currentPath = href;
		this.updateActive(href);
	}

	debounce(fn, delay) {
		let timer;
		return () => {
			clearTimeout(timer);
			timer = setTimeout(fn, delay);
		};
	}
}
