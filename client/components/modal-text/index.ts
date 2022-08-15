class ModalTextComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
            .modal-text {
                width: 100%;
                font-family: "Raleway", sans-serif;
                font-weight: 500;
                font-size: 10px;
                text-align: center;
                color: #111;
            }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <p class="modal-text">
            ${this.textContent}
        </p>
        `;
	}
}
customElements.define("modal-text", ModalTextComponent);
