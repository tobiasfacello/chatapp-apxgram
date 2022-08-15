export const apxLogo = require("url:../../assets/apx-3d.png");

customElements.define(
	"home-page",
	class initHomePage extends HTMLElement {
		connectedCallback() {
			this.render();
			this.addListeners();
		}

		render() {
			this.innerHTML = `
            <div class="div-container">
                <section class="main-section">
                    <img class="apx-logo" src="${apxLogo}">
                    <brand-comp></brand-comp>
                    <p class="brand-slogan">Hablar con tus amigos es fácil con <b><b class="yellow-text">Apx<b class="white-text">gram</b></p>
                </section>
                <section class="signin-section">
                    <small-text>¿Aún no tenes una cuenta? Hace click en “Registrarse” para formar parte de Apxgram.</small-text>
                    <btn-comp path="/register" yellowBtn>Registrarse</btn-comp>
                    <small-text>O</small-text>
                    <btn-comp path="/login" whiteBtn>Iniciar Sesión</btn-comp>
                </section>
            </div>
            `;

			let style = document.createElement("style");
			style.textContent = `

            .div-container {
                width: 100%;
                height: 100%; 
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
                padding-top: 30px;
            }

            .apx-logo {
                width: 140px;
                height: 60px;
                margin-bottom: 20px;
            }

            .brand-slogan {
                width: 40%;
                margin: 0;
                font-family: "Raleway", sans-serif;
                font-weight: 500;
                font-size: 15px;
                text-align: center;
                color: #EEE;
            }

            .brand-slogan .yellow-text {
                font-weight: 600;
                color: #FFC269;
            }

            .brand-slogan .white-text {
                font-weight: 600;
                color: #FFFFFF;
            }
            `;

			this.appendChild(style);
		}

		addListeners() {}
	}
);
