import { state } from "../../state";
const sendIcon = require("url:../../assets/rocket.png");

type Message = {
	from: string;
	content: string;
};

customElements.define(
	"chatroom-page",
	class initChatroomPage extends HTMLElement {
		connectedCallback() {
			const secureChatRoomId =
				state.getState().currentChatRoomData.secureChatRoomId;
			state.initChatRoom(secureChatRoomId);
			state.subscribe(() => {
				const currentState = state.getState();
				const messagesArr = Object.entries(
					currentState.currentChatRoomData.messages
				);
				this.messages = messagesArr.map((m) => {
					return m[1];
				});
				this.render();
				this.addListeners();
			});
			this.render();
			this.addListeners();
		}

		messages = [];

		render() {
			this.innerHTML = `
            <div class="div-container">
                <div class="user">
                    <user-profile class="profile"></user-profile>
                    <small-text class="chatroom-id"></small-text>
                </div>
                <section class="messages-section">
                    <div class="messages">
                        ${this.messages
							.map((message) => {
								if (
									message.from !== undefined &&
									message.content !== undefined
								) {
									return `<message-comp class="message-item" messageAuthor="${message.from}">${message.content}</message-comp>`;
								}
							})
							.join(" ")}
                    </div>
                </section>
                <form class="text-chat">
                    <div class="input-container">
                        <input name="message" class="input__field" type="text" placeholder="Escribe un mensaje">
                        <button class="submit-button" type="submit">
                            <img class="submit-button__icon" src="${sendIcon}">
                        </button>
                    </div>
                </form>
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
                width: 100%;
                height: 
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .messages-section {
                max-width: 500px;
                width: 100%;
                height: calc(100vh - 345px);
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid #333333;
                border-radius: 5px;
                background: linear-gradient(190.67deg, #2E2E2E 8.33%, #000000 100%);
                overflow-y: scroll;
            }

            @media (min-width: 768px) {
                .messages-section {
                    max-width: 600px;
                    width: 80%;
                }    
            }

            @media (min-width: 1090px) {
                .messages-section {
                    width: 50%;
                }    
            }

            .messages {
                width: 95%;
                max-height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }

            @media (min-width: 500px) {
                .messages {
                    width: 400px;
                }
            }

            @media (min-width: 768px) {
                .messages {
                    width: 500px;
                }
            }

            .profile {
                width: 100%;
            }

            .input-container {
                min-width: 330px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
            }
        
            @media (min-width: 500px) {
                .input-container {
                    width: 460px;
                    max-width: 500px;
                }
            }

            @media (min-width: 768px) {
                .input-container {
                    width: 500px;
                }
            }

            .input__field {
                width: calc(100% - 50px);
                height: 50px;
                padding: 0 10px;
                font-family: "Raleway", sans-serif;
                font-weight: 500;
                font-size: 15px;
                text-align: left;
                background-color: #222222;
                color: #EEEEEE;
                border: 1px solid #333333;
                border-right: 0;
                border-radius: 5px 0 0 5px;
            }
    
            .input__field:placeholder {
                font-family: "Raleway", sans-serif;
                font-weight: 500;
                font-size: 15px;
                color: #79767D;
            }

            .input__field:focus {
                background: transparent;
                border: 1px solid #FFFFFF;
                border-right: 0;
                outline: none;
            }
    
            .submit-button {
                width: 50px;
                height: 50px;
                padding: 10px;
                font-family: "Raleway", sans-serif;
                font-weight: 500;
                font-size: 15px;
                text-align: center;
                border: none;
                border-radius: 0px 5px 5px 0px;
                color: #272A32;
                background: linear-gradient(180deg, #F7CF4B 0%, #FFC269 100%);
            }

            .submit-button:hover {
                cursor: pointer;
            }

            .submit-button:active,
            .submit-button.active {
                background: linear-gradient(180deg, #0C8CE9 0%, #5F7DD8 100%);
            }

            .submit-button__icon {
                width: 30px;
                height: 30px;
            }
            `;

			this.appendChild(style);
		}

		addListeners() {
			const profileCompEl: HTMLElement = this.querySelector(".profile");
			const userNameEl: HTMLTitleElement =
				profileCompEl.shadowRoot.querySelector(".user__name");

			const chatRoomIdEl: HTMLElement =
				this.querySelector(".chatroom-id");
			const smallTextEl: HTMLParagraphElement =
				chatRoomIdEl.shadowRoot.querySelector(".small-text");

			const messagesSectionEl: HTMLElement =
				this.querySelector(".messages-section");

			const textChatEl: HTMLFormElement =
				this.querySelector(".text-chat");

			const inputFieldEl: HTMLInputElement =
				this.querySelector(".input__field");

			const submitButtonEl: HTMLButtonElement =
				this.querySelector(".submit-button");

			const userData = state.getUserData();
			const chatRoomData = state.getCurrentChatRoomData();
			const currentChatRoomId = chatRoomData.currentChatRoomId;
			const secureChatRoomId = chatRoomData.secureChatRoomId;

			userNameEl.textContent = `${userData.name}`;
			smallTextEl.textContent = `ID: ${currentChatRoomId}`;

			document.addEventListener("keypress", () => {
				inputFieldEl.focus();
			});

			document.addEventListener("keydown", (e) => {
				if (e.key == "Enter") {
					submitButtonEl.classList.add("active");
				}
			});

			document.addEventListener("keyup", (e) => {
				if (e.key == "Enter") {
					submitButtonEl.classList.remove("active");
				}
			});

			textChatEl.addEventListener("submit", (e) => {
				const target = e.target as HTMLFormElement;
				e.preventDefault();

				if (target.message.value !== "") {
					const newMessage: Message = {
						from: userData.name,
						content: target.message.value,
					};

					state.postRealtimeChatRoom(
						{ id: secureChatRoomId },
						{ message: newMessage }
					);
				}
			});

			messagesSectionEl.scrollTop = messagesSectionEl.scrollHeight;
		}
	}
);
