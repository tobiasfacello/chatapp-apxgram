import { Router } from "@vaadin/router";
import { state } from "../../state";

class RegistrationFormComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .registration-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .input-container {
            width: 275px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }

        .input__label {
            width: 100%;
            justify-self: flex-start;
            margin-bottom: 5px;
			font-family: "Raleway", sans-serif;
			font-weight: 400;
			font-size: 12px;
            color: #EEEEEE;
        }

        .input__field {
            width: 100%;
			height: 50px;
			font-family: "Raleway", sans-serif;
			font-weight: 500;
			font-size: 15px;
			text-align: center;
			border: none;
			border-radius: 5px;
            background-color: #222222;
            color: #EEEEEE;
        }

        .input__field:placeholcer {
            font-family: "Raleway", sans-serif;
			font-weight: 500;
			font-size: 15px;
            color: #79767D;
        }

        .input__field:focus {
            background-color: transparent;
            outline: 1px solid #FFFFFF;
        }

        .confirmation-container {
            margin-top: 45px;
        }

        .confirm-button {
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

        .yellow-btn {
			background: linear-gradient(180deg, #F7CF4B 0%, #FFC269 100%);
		}

		`;

		this.render();
		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
            <form action="submit" class="registration-form">
                <div class="input-container">
                    <label class="input__label">Nombre</label>
                    <input class="input__field" type="text" placeholder="Ingresá tu nombre" value="${this.textContent}" required>
                </div>
                <div class="input-container">
                    <label class="input__label">Autenticación</label>
                    <input class="input__field" type="email" placeholder="Correo electrónico" value="${this.textContent}" required>
                </div>
                <div class="input-container">
                    <input class="input__field" type="password" placeholder="Contraseña" value="${this.textContent}" required>
                </div>
                <div class="confirmation-container">
                    <small-text>Al hacer click en “Confirmar” está aceptando los “Términos y Condiciones” para registrarse a Apxgram.</small-text>
                    <input class="confirm-button yellow-btn" type="submit" value="Confirmar">
                </div>
            </form>
        `;
	}

	addListeners() {
		const registrationFormEl: HTMLFormElement =
			this.shadow.querySelector(".registration-form");

		registrationFormEl.addEventListener("submit", (e) => {
			e.preventDefault();
			state.setPreviousLocation(location.pathname);
			Router.go("/lobby");
		});
	}
}
customElements.define("registration-form", RegistrationFormComponent);
