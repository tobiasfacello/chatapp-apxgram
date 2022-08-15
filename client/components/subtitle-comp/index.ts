class SubtitleComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
            .subtitle {
                width: 100%;
                margin: 0;
                font-family: "Raleway", sans-serif;
                font-weight: 700;
                font-size: 15px;
                text-align: center;
                color: #111;
            }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <p class="subtitle">
            ${this.textContent}
        </p>
        `;
	}
}
customElements.define("subtitle-comp", SubtitleComponent);
