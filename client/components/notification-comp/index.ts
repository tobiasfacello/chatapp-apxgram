class NotificationComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .popup-container {
            position: absolute;
            left: 7.5%;
            top: 6.5%;
            width: 300px;
            margin: 0 auto;
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            opacity: 1;
        }

        @media (min-width: 768px) {
            .popup-container {
                left: 0;
                right: 0;
                width: 40%
            }
        }

        .popup-container.error-notification {
            background: linear-gradient(180deg, #C0564B 0%, #FF6767 100%);
        }

        .popup-container.success-notification {
            background: linear-gradient(180deg, #89DEF1 5.63%, #B2D0CE 97.54%);
        }

        .notification__title {
            width: 100%;
            margin: 5px 0;
            font-family: "Raleway", sans-serif;
            font-weight: 500;
            font-size: 15px;
            text-align: center;
            color: #111;

        }

        .notification__text {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 10px;
            font-family: "Raleway", sans-serif;
            font-weight: 400;
            font-size: 10px;
            text-align: center;
            color: #111;
        }

        @keyframes popup-opacity {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {

            }
        }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
        <div class="popup-container 
        ${this.hasAttribute("errorNotification") ? "error-notification" : ""}
        ${
			this.hasAttribute("successNotification")
				? "success-notification"
				: ""
		}
        ">
            <h3 class="notification__title">
                ${this.getAttribute("notificationTitle")}
            </h3>
            <p class="notification__text">
                ${this.textContent}
            </p>
        </div>
        `;
	}
}
customElements.define("notification-comp", NotificationComponent);
