customElements.define(
	"register-page",
	class initRegisterPage extends HTMLElement {
		connectedCallback() {
			this.render();
		}

		render() {
			this.innerHTML = `
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
            `;

			this.appendChild(style);
		}
	}
);
