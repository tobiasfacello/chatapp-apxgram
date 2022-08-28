import { Router } from "@vaadin/router";
import { state } from "../../state";

type ChatRoomResponse = {
	response: Promise<any>;
	status: number;
};

customElements.define(
	"lobby-page",
	class initLobbyPage extends HTMLElement {
		connectedCallback() {
			this.render();
			this.addListeners();
		}

		render() {
			this.innerHTML = `
            <notification-comp class="notification register-notification" successNotification notificationTitle="Registro completado">
            Bienvenido a Apxgram!
            </notification-comp>
            <notification-comp class="notification login-notification" successNotification notificationTitle="Inicio de sesión completado">
            Bienvenido de vuelta a Apxgram!
            </notification-comp>
            <notification-comp class="notification chatroom-notification" errorNotification notificationTitle="Falló el ingreso a la sala">
            Asegurate de ingresar el ID correctamente, de lo contrario, podes crear una nueva sala.
            </notification-comp>
            <div class="div-container">
                <section class="main-section">
                    <brand-comp></brand-comp>
                    <p class="brand-slogan"><b class="yellow-text">Creá una nueva sala</b> y enviale el ID a tu amigo.
                    <br><br>
                    También <b class="yellow-text">podes entrar a una sala existente</b> con un ID.</p>
                </section>
                <section class="chat-form-section">
                    <form class="chatroom-form">
                        <div class="input-container">
                            <label class="input__label" for="chatroom">Ingresar a sala:</label>
                            <input id="chatroom" name="chatroom" class="input__field" type="text" placeholder="ID de sala existente" value="${this.textContent}" required>
                        </div>
                        <div class="confirmation-container">
                            <input class="confirm-button yellow-btn" type="submit" value="Ingresar">
                        </div>
                    </form>
                    <input class="create-room-button dark-btn" type="submit" value="Crear una nueva sala">
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

            .brand-slogan .yellow-text {
                font-weight: 500;
                color: #FFC269;
            }

            .brand-slogan .white-text {
                font-weight: 600;
                color: #FFFFFF;
            }

            .chatroom-section {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .chatroom-form {
                width: 100%;
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
                margin-top: 70px;
            }

            .confirm-button,
            .create-room-button {
                min-width: 275px;
                max-width: 330px;
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

            .confirm-button:hover,
            .create-room-button:hover {
                cursor: pointer;
            }

            @media (min-width: 768px) {
                .confirm-button,
                .create-room-button {
                    max-width: 380px;
                    width: 380px;
                }
            }   

            .yellow-btn {
                margin-bottom: 20px;
                background: linear-gradient(180deg, #F7CF4B 0%, #FFC269 100%);
            }

            .dark-btn {
                color: #FFFFFF;
                background: linear-gradient(180deg, #363339 0%, #1E2121 100%);
            }    

            .notification {
                opacity: 0;
            }
            `;

			this.appendChild(style);
		}

		addListeners() {
			const bodyEl = document.querySelector("body");

			const footerEl: HTMLElement = bodyEl.querySelector(".footer");

			const chatIconEl: HTMLImageElement =
				footerEl.shadowRoot.querySelector(".chat-icon");

			const historyIconEl: HTMLImageElement =
				footerEl.shadowRoot.querySelector(".history-icon");

			const chatroomFormEl: HTMLFormElement =
				this.querySelector(".chatroom-form");

			const inputFieldEl: HTMLInputElement =
				this.querySelector(".input__field");

			const confirmButtonEl: HTMLButtonElement =
				this.querySelector(".confirm-button");

			const createChatRoomEl: HTMLButtonElement = this.querySelector(
				".create-room-button"
			);

			const chatRoomNotificationEl: HTMLElement = this.querySelector(
				".chatroom-notification"
			);

			const registerNotificationEl: HTMLElement = this.querySelector(
				".register-notification"
			);

			const logInNotificationEl: HTMLElement = this.querySelector(
				".login-notification"
			);

			const locationBeforeLobby: string = state.getPreviousLocation();
			if (locationBeforeLobby == "/register") {
				registerNotificationEl.style.opacity = "1";
				setTimeout(() => {
					registerNotificationEl.style.opacity = "0";
				}, 6000);
			} else if (locationBeforeLobby == "/login") {
				logInNotificationEl.style.opacity = "1";
				setTimeout(() => {
					logInNotificationEl.style.opacity = "0";
				}, 6000);
			}

			inputFieldEl.addEventListener("invalid", () => {
				chatRoomNotificationEl.style.opacity = "1";
				setTimeout(() => {
					chatRoomNotificationEl.style.opacity = "0";
				}, 6000);
			});

			chatroomFormEl.addEventListener("submit", (e) => {
				const target = e.target as HTMLFormElement;
				e.preventDefault();
				const roomId = target.chatroom.value;
				const chatRoomAccessPromise: Promise<ChatRoomResponse> =
					state.getFirestoreChatRoom({
						id: roomId,
					});

				chatRoomAccessPromise.then((res) => {
					if (res.status == 200) {
						res.response.then((roomData) => {
							const currentChatRoomId = roomId;
							const secureChatRoomId = roomData.rtdbChatRoomId;

							state.setCurrentChatRoomData({
								currentChatRoomId,
								secureChatRoomId,
								messages: [],
							});
							state.setChatRoomHistory({
								currentChatRoomId,
								secureChatRoomId,
								messages: [],
							});
							Router.go(`/chatroom/${currentChatRoomId}`);
						});
					} else if (res.status == 404) {
						chatRoomNotificationEl.style.opacity = "1";
						setTimeout(() => {
							chatRoomNotificationEl.style.opacity = "0";
						}, 6000);
					}
				});
			});

			//TODO: Crear todas las interacciones correspondientes al botón "Crear una nueva sala"
			createChatRoomEl.addEventListener("click", () => {
				const chatRoomCreationPromise: Promise<ChatRoomResponse> =
					state.createNewChatRoom();

				chatRoomCreationPromise.then((res) => {
					if (res.status == 201) {
						res.response.then((roomData) => {
							const currentChatRoomId = roomData.roomId;
							const secureChatRoomId = roomData.rtdbChatRoomId;

							state.setCurrentChatRoomData({
								currentChatRoomId,
								secureChatRoomId,
								messages: [],
							});
							state.setChatRoomHistory({
								currentChatRoomId,
								secureChatRoomId,
								messages: [],
							});
							Router.go(`/chatroom/${currentChatRoomId}`);
						});
					} else if (res.status == 404) {
						chatRoomNotificationEl.style.opacity = "1";
						setTimeout(() => {
							chatRoomNotificationEl.style.opacity = "0";
						}, 6000);
					}
				});
			});

			chatIconEl.addEventListener("click", () => {
				if (inputFieldEl.value == "") {
					chatRoomNotificationEl.style.opacity = "1";
					setTimeout(() => {
						chatRoomNotificationEl.style.opacity = "0";
					}, 6000);
				} else {
					confirmButtonEl.click();
				}
			});
		}
	}
);
