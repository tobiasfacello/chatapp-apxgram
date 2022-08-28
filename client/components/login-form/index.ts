import { Router } from "@vaadin/router";
import { state } from "../../state";

type LogInResponse = {
	response: Promise<any>;
	status: number;
};
class LoginFormComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .login-form {
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
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 45px;
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
            <notification-comp class="notification wrong-input" errorNotification notificationTitle="Falló el inicio de sesión">
            Por favor, verifique e ingrese los datos solicitados para efectuar el inicio de sesión correctamente.
            </notification-comp>
            <notification-comp class="notification not-found" errorNotification notificationTitle="Usuario no encontrado">
            El correo o contraseña son incorrectos, por favor ingrese los datos nuevamente o dirijase a 'Registrarse'.
            </notification-comp>

            <form action="submit" class="login-form">
                <div class="input-container">
                    <label class="input__label" for="email">Autenticación</label>
                    <input id="email" name="email" class="input__field" type="email" placeholder="Correo electrónico" value="${this.textContent}" required>
                </div>
                <div class="input-container">
                    <input id="password" name="password" class="input__field" type="password" placeholder="Contraseña" value="${this.textContent}" required>
                </div>
                <div class="confirmation-container">
                    <small-text>Al iniciar sesión a continuación, está aceptando los "Términos y Condiciones" de uso de Apxgram.</small-text>
                    <input class="confirm-button yellow-btn" type="submit" value="Iniciar sesión">
                </div>
            </form>
        `;
	}

	addListeners() {
		const loginFormEl: HTMLFormElement =
			this.shadow.querySelector(".login-form");

		const inputFieldsEl: NodeListOf<HTMLInputElement> =
			loginFormEl.querySelectorAll(".input__field");

		const wrongInputNotifEl: HTMLElement =
			this.shadow.querySelector(".wrong-input");

		const notFoundNotifEl: HTMLElement =
			this.shadow.querySelector(".not-found");

		wrongInputNotifEl.addEventListener("click", () => {
			wrongInputNotifEl.style.opacity = "0";
		});

		notFoundNotifEl.addEventListener("click", () => {
			notFoundNotifEl.style.opacity = "0";
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

		loginFormEl.addEventListener("submit", (e) => {
			const target = e.target as HTMLFormElement;
			e.preventDefault();

			const userEmail: string = target.email.value;
			const userPassword: string = target.password.value;

			const userLoginPromise: Promise<LogInResponse> =
				state.postSignInForm({
					email: userEmail,
					password: userPassword,
				});

			userLoginPromise.then((res: LogInResponse) => {
				if (res.status == 200) {
					state.setPreviousLocation(location.pathname);
					Router.go("/lobby");
				} else if (res.status == 404) {
					notFoundNotifEl.style.opacity = "1";
					setTimeout(() => {
						notFoundNotifEl.style.opacity = "0";
					}, 6000);
				}
			});
		});
	}
}
customElements.define("login-form", LoginFormComponent);
