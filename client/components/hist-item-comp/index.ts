import { alienEmoji } from "../user-profile";

class HistorialItemComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .historial-item-container {
            width: 300px;
            height: 75px;
            padding: 5px 15px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            border-radius: 20px;
            background: linear-gradient(144.89deg, #FFC269 5.63%, #F7CF4B 97.54%);
        }

        .historial-item-container:hover {
			cursor: pointer;
		}

        .historial-item-container:active {
			background: linear-gradient(180deg, #0C8CE9 0%, #5F7DD8 100%);
		}

        @media (min-width: 768px) {
            .historial-item-container {
                width: 380px;
            }
        }

        .picture-wrapper {
            width: 30px;
            height: 30px;
            padding: 10px;
            background: linear-gradient(180deg, #EDFC74 0%, #F5FFA8 100%);
            border: none;
            border-radius: 50px;
        }

        .historial-item__user-img {
            width: 100%;
            height: 100%;
        }

        .historial-item__id {
            width: 100%;
            font-family: "Raleway", sans-serif;
            font-weight: 500;
            font-size: 16px;
            text-align: center;
            color: #111111;

        }

        .historial-item__id:active {
            color: #EEEEEE;
        }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <div class="historial-item-container 
        ${this.hasAttribute("errorhistorial") ? "error-historial" : ""}
        ">
            <div class="picture-wrapper">
                <img class="historial-item__user-img" src="${alienEmoji}">
            </div>

            <div>
                <h3 class="historial-item__id">
                ID: ${this.getAttribute("historialId")}
                </h3>
            </div>
        </div>
        `;
	}
}
customElements.define("hist-item-comp", HistorialItemComponent);
