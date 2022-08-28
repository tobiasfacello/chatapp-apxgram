import { Router } from "@vaadin/router";

class ButtonComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .button {
			min-width: 275px;
			width: 100%;
			height: 50px;
			font-family: "Raleway", sans-serif;
			font-weight: 500;
			font-size: 15px;
			text-align: center;
			border: none;
			border-radius: 5px;
			color: #272A32;
        }

		.button:hover {
			cursor: pointer;
		}

		@media (min-width: 768px) {
			.button {
				width: 380px;
			}
		}

		.white-btn {
			background: linear-gradient(180deg, #FCFFDF 0%, #DFE0DF 100%);
		}

		.yellow-btn {
			background: linear-gradient(180deg, #F7CF4B 0%, #FFC269 100%);
		}

		.red-btn {
			color: #EEEEEE;
			background: linear-gradient(180deg, #FF6767 0%, #C0564B 100%);
		}
		`;

		this.render();
		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
        <button class="button 
		${this.hasAttribute("whiteBtn") ? "white-btn" : ""} 
		${this.hasAttribute("yellowBtn") ? "yellow-btn" : ""}
		${this.hasAttribute("redBtn") ? "red-btn" : ""}"
		type="submit"
		${this.hasAttribute("path") ? `path="${this.getAttribute("path")}"` : ""}
		${this.hasAttribute("link") ? `link="${this.getAttribute("link")}"` : ""}
		>
            ${this.textContent}
        </button>
        `;
	}

	addListeners() {
		const buttonEl: HTMLElement = this.shadow.querySelector(".button");

		buttonEl.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (target.hasAttribute("path")) {
				const route = target.getAttribute("path");
				Router.go(route);
			} else if (target.hasAttribute("link")) {
				const url = target.getAttribute("link");
				window.open(url, "_blank");
			}
		});
	}
}
customElements.define("btn-comp", ButtonComponent);
