class HeaderComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .header {
            width: 100vw;
            height: 60px;
			display: flex;
			justify-content: space-between;
			align-items: center;
        }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <header class="header">
			<div class="header__button">
				<modal-btn-comp returnBtn></modal-btn-comp>
			</div>
			<div class="header__button">
				<modal-btn-comp optionsBtn></modal-btn-comp>
			</div>
        </header>
        `;
	}
}
customElements.define("header-comp", HeaderComponent);
