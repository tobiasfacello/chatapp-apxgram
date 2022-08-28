import { Router } from "@vaadin/router";
import { state } from "../../state";

type RegisterResponse = {
	response: Promise<any>;
	status: number;
};

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

		@media (min-width: 768px) {
			.input-container {
				width: 100%;
			}
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

		@media (min-width: 768px) {
			.input__field {
				width: 380px;
			}
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
			width: 100%;
            margin-top: 45px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
        }

        .confirm-button {
			min-width: 275px;
			max-width: 330px;
			height: 50px;
			font-family: "Raleway", sans-serif;
			font-weight: 500;
			font-size: 15px;
			text-align: center;
			border: none;
			border-radius: 5px;
			color: #272A32;
        }

		.confirm-button:hover {
			cursor: pointer;
		}

		@media (min-width: 768px) {
			.confirm-button {
				max-width: 380px;
				width: 380px;
			}
		}

        .yellow-btn {
			background: linear-gradient(180deg, #F7CF4B 0%, #FFC269 100%);
		}

        .notification {
            opacity: 0;
        }
		`;

		this.render();
		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
            <notification-comp class="notification wrong-input" errorNotification notificationTitle="Falló el registro">
            Por favor, ingrese los datos solicitados para efectuar el registro correctamente.
            </notification-comp>
            <notification-comp class="notification already-exists" errorNotification notificationTitle="Email ya registrado">
            Por favor, dirijase a "Iniciar sesión" o ingrese los datos solicitados para efectuar el nuevo registro correctamente.
            </notification-comp>
            
            <form action="submit" class="registration-form">
                <div class="input-container">
                    <label class="input__label" for="username">Nombre</label>
                    <input id="username" name="username" class="input__field" type="text" placeholder="Ingresá tu nombre" value="${this.textContent}" required>
                </div>
                <div class="input-container">
                    <label class="input__label" for="email">Autenticación</label>
                    <input id="email" name="email" class="input__field" type="email" placeholder="Correo electrónico" value="${this.textContent}" required>
                </div>
                <div class="input-container">
                    <input id="password" name="password" class="input__field" type="password" placeholder="Contraseña" value="${this.textContent}" required>
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

		const inputFieldsEl: NodeListOf<HTMLInputElement> =
			registrationFormEl.querySelectorAll(".input__field");

		const wrongInputNotifEl: HTMLElement =
			this.shadow.querySelector(".wrong-input");

		const alreadyExistsNotifEl: HTMLElement =
			this.shadow.querySelector(".already-exists");

		wrongInputNotifEl.addEventListener("click", () => {
			wrongInputNotifEl.style.opacity = "0";
		});

		alreadyExistsNotifEl.addEventListener("click", () => {
			alreadyExistsNotifEl.style.opacity = "0";
		});

		inputFieldsEl.forEach((el) => {
			el.addEventListener("invalid", () => {
				state.setPreviousLocation(location.pathname);
				wrongInputNotifEl.style.opacity = "1";
				setTimeout(() => {
					wrongInputNotifEl.style.opacity = "0";
				}, 6000);
			});
		});

		registrationFormEl.addEventListener("submit", (e) => {
			const target = e.target as HTMLFormElement;
			e.preventDefault();

			const userName: string = target.username.value;
			const userEmail: string = target.email.value;
			const userPassword: string = target.password.value;

			const registerPromise: Promise<RegisterResponse> =
				state.postSignUpForm({
					name: userName,
					email: userEmail,
					password: userPassword,
				});

			registerPromise.then((res: RegisterResponse) => {
				if (res.status == 201) {
					state.setUserData({ name: userName });
					state.setPreviousLocation(location.pathname);
					Router.go("/lobby");
				} else if (res.status == 409) {
					state.setPreviousLocation(location.pathname);
					alreadyExistsNotifEl.style.opacity = "1";
					setTimeout(() => {
						alreadyExistsNotifEl.style.opacity = "0";
					}, 6000);
				}
			});
		});
	}
}

customElements.define("registration-form", RegistrationFormComponent);
