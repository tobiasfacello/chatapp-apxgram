class BrandComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .brand-name {
            width: 100%;
            margin: 0;
            margin-bottom: 20px;
            font-family: "Poppins", sans-serif;
            font-weight: 700;
            font-size: 42px;
            line-height: 65px;
            color: #FFF;
        }

        .brand-name b {
            color: #FFC269;
        }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <h3 class="brand-name">
        <b>Apx</b>gram
        </h3>
        `;
	}
}
customElements.define("brand-comp", BrandComponent);
