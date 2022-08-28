class SmallTextComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
            .small-text {
                width: 100%;
                margin-bottom: 10px;
                font-family: "Raleway", sans-serif;
                font-weight: 400;
                font-size: 12px;
                text-align: center;
                color: #A5A5A5;
            }

            @media (min-width: 768px) {
                .small-text {
                    width: 380px;
                }
            }

            .small-text.centered {
                width: 100%;
                margin: 0;
            }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <p class="small-text 
        ${this.hasAttribute("isCentered") ? "centered" : ""}
        ">
            ${this.textContent}
        </p>
        `;
	}
}
customElements.define("small-text", SmallTextComponent);
