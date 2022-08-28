import { exit } from "process";

const dotsIcon = require("url:../../assets/dots-vertical.svg");
const backArrowIcon = require("url:../../assets/chevron-left.svg");
class ModalBtnComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		const style = document.createElement("style");
		style.textContent = `
            .modal-button {
                width: 30px;
                height: 30px;
                margin: 5px 15px;
                padding: 0;
                border: none;
                border-radius: 20px;
                background-color: rgba(255, 255, 255, 0.1);
            }

            .modal-button:hover {
                cursor: pointer;
            }

            .modal-button:active {
                background-color: rgba(255, 255, 255, 0.7);
            }

            .button__icon {
                width: 24px;
            }

            .modal {
                width: 330px;
                border: none;
                border-radius: 20px;
                background: linear-gradient(180deg, #DFE0DF 0%, #FCFFDF 100%);
            }

            @media (min-width: 768px) {
                .modal {
                    width: 415px;
                }
            }

            .modal__content {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            .modal__content-text {
                width: 275px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 30px;
            }

            .modal__content-buttons {
                width: 275px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }
        `;

		this.render();
		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
        <button class="modal-button 
        ${this.hasAttribute("optionsBtn") ? "options-button" : ""}
        ${this.hasAttribute("returnBtn") ? "return-button" : ""}
        ">
            <img class="button__icon" src="
            ${this.hasAttribute("optionsBtn") ? dotsIcon : ""}
            ${this.hasAttribute("returnBtn") ? backArrowIcon : ""}
            ">
        </button>

        <dialog class="modal options-modal">
            <div class="modal__content">
                <div class="modal__content-text">
                    <subtitle-comp>Información</subtitle-comp>
                    <small-text>&#169; Tobías Facello - 2022</small-text>
                </div>
                <div class="modal__content-buttons">
                    <btn-comp class="buttons__apxgram-btn" link="https://apx.school/" yellowBtn>¿Qué es apx?</btn-comp>
                    <btn-comp class="buttons__apxgram-btn" path="/information" yellowBtn>¿Qué es Apxgram?</btn-comp>
                    <btn-comp class="buttons__cancel-btn" redBtn>Cancelar</btn-comp>
                </div>
            </div>
        </dialog>

        <dialog class="modal return-modal">
        <div class="modal__content">
            <div class="modal__content-text">
                <subtitle-comp>Estas a punto de cerrar sesión...</subtitle-comp>
                <modal-text>Hace click en “Cancelar” para regresar, de lo contrario podes cerrar tu sesión haciendo click en “Salir”.</modal-text>
            </div>
            <div class="modal__content-buttons">
            <btn-comp class="buttons__exit-btn" path="/home" yellowBtn>Salir</btn-comp>
                <btn-comp class="buttons__cancel-btn" redBtn>Cancelar</btn-comp>
            </div>
        </div>
        </dialog>

        `;
	}

	addListeners() {
		const modalBtnEl: HTMLElement =
			this.shadow.querySelector(".modal-button");

		const optionsModalEl: HTMLDialogElement =
			this.shadow.querySelector(".options-modal");

		const returnModalEl: HTMLDialogElement =
			this.shadow.querySelector(".return-modal");

		const redirectionBtnEl: NodeListOf<Element> =
			this.shadow.querySelectorAll(".buttons__apxgram-btn");

		const cancelBtnEl: NodeListOf<Element> = this.shadow.querySelectorAll(
			".buttons__cancel-btn"
		);
		const exitBtnEl: HTMLElement =
			this.shadow.querySelector(".buttons__exit-btn");

		modalBtnEl.addEventListener("click", (e) => {
			if (
				modalBtnEl.classList.contains("options-button") &&
				!optionsModalEl.hasAttribute("open")
			) {
				optionsModalEl.showModal();
			} else if (
				modalBtnEl.classList.contains("return-button") &&
				!returnModalEl.hasAttribute("open")
			) {
				if (
					location.pathname !== "/lobby" &&
					location.pathname !== "/home"
				) {
					history.back();
				} else {
					returnModalEl.showModal();
				}
			}
		});

		redirectionBtnEl.forEach((el) => {
			el.addEventListener("click", () => {
				if (optionsModalEl.hasAttribute("open")) {
					optionsModalEl.close();
				}
			});
		});

		cancelBtnEl.forEach((el) => {
			el.addEventListener("click", () => {
				if (optionsModalEl.hasAttribute("open")) {
					optionsModalEl.close();
				}
				if (returnModalEl.hasAttribute("open")) {
					returnModalEl.close();
				}
			});
		});

		exitBtnEl.addEventListener("click", () => {
			if (returnModalEl.hasAttribute("open")) {
				returnModalEl.close();
			}
		});
	}
}
customElements.define("modal-btn-comp", ModalBtnComponent);
