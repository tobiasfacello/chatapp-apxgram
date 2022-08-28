customElements.define(
	"login-page",
	class initLoginPage extends HTMLElement {
		connectedCallback() {
			this.render();
		}

		render() {
			this.innerHTML = `
            <div class="div-container">
                <section class="main-section">
                    <brand-comp></brand-comp>
                    <p class="brand-slogan">Ingresá los datos que hayas utilizado para registrarte para <b class="yellow-text">iniciar sesión a tu cuenta</b>.</p>
                </section>
                <section class="login-section">
                    <login-form class="form"></login-form>
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

            @media (min-width: 768px) {
                .div-container {
                    padding-top: 15px;
                }
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

            .login-section {
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
            `;

			this.appendChild(style);
		}
	}
);
