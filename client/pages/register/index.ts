import { state } from "../../state";

customElements.define(
	"register-page",
	class initRegisterPage extends HTMLElement {
		connectedCallback() {
			this.render();
			this.addListeners();
		}

		render() {
			this.innerHTML = `
            <notification-comp class="notification" errorNotification notificationTitle="Falló el registro">
            Por favor, ingrese los datos solicitados para efectuar el registro correctamente.
            </notification-comp>
            <div class="div-container">
                <section class="main-section">
                    <brand-comp></brand-comp>
                    <p class="brand-slogan">Ingresá los siguientes datos para <b class="yellow-text">completar tu registro</b>.</p>
                </section>
                <section class="registration-section">
                    <registration-form class="form"></registration-form>
                </section>
            </div>
            `;

			let style = document.createElement("style");
			style.textContent = `

            .div-container {
                width: 100%;
                height: 100%; 
                padding-top: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }

            .main-section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
            }

            .brand-slogan {
                width: 50%;
                margin: 0;
                font-family: "Raleway", sans-serif;
                font-weight: 500;
                font-size: 15px;
                text-align: center;
                color: #EEE;
            }

            .registration-section {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .brand-slogan .yellow-text {
                font-weight: 500;
                color: #FFC269;
            }

            .brand-slogan .white-text {
                font-weight: 600;
                color: #FFFFFF;
            }

            .notification {
                opacity: 0;
            }
            `;

			this.appendChild(style);
		}

		addListeners() {
			const registrationFormEl: HTMLFormElement =
				this.querySelector(".form");

			const shadowRegistrationFormEl: HTMLFormElement =
				registrationFormEl.shadowRoot.querySelector(
					".registration-form"
				);

			const inputFieldsEl: NodeListOf<HTMLInputElement> =
				shadowRegistrationFormEl.querySelectorAll(".input__field");

			const popUpNotificationEl: HTMLElement =
				this.querySelector(".notification");

			popUpNotificationEl.addEventListener("click", () => {
				popUpNotificationEl.style.opacity = "0";
			});

			inputFieldsEl.forEach((el) => {
				el.addEventListener("invalid", () => {
					state.setPreviousLocation(location.pathname);
					popUpNotificationEl.style.opacity = "1";
					setTimeout(() => {
						popUpNotificationEl.style.opacity = "0";
					}, 6000);
				});
			});
		}
	}
);
