import { Router } from "@vaadin/router";
import { state } from "../../state";

type AccessResponse = {
	response: Promise<any>;
	status: number;
};

customElements.define(
	"history-page",
	class initHistoryPage extends HTMLElement {
		history: string[] = [];
		connectedCallback() {
			const historyData = state.getChatRoomHistory();
			historyData.forEach((room: any) => {
				this.history.push(room.currentChatRoomId);
			});
			this.render();
			this.addListeners();
		}

		render() {
			this.innerHTML = `
            <notification-comp class="notification chatroom-notification" errorNotification notificationTitle="Falló el ingreso a la sala">
            No se ha podido establecer la conexión a la sala o puede que la misma haya sido eliminado.
            </notification-comp>
            	<div class="div-container">
					<section class="main-section">
						<p class="brand-slogan">Historial</p>
						<div class="hist-items">
							${this.history
								.map((id) => {
									return `<hist-item-comp class="history-item" historialId="${id}"></hist-item-comp>`;
								})
								.join("")}			
						</div>
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
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

			@media (min-width: 768px) {
				.hist-items {
					width: 80%;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 10px;
					flex-wrap: wrap;
				}
			}

            .brand-slogan {
                width: 50%;
                margin: 15px 0;
                font-family: "Raleway", sans-serif;
                font-weight: 600;
                font-size: 15px;
                text-align: center;
                color: #EEE;
            }

            .notification {
                opacity: 0;
            }
            `;

			this.appendChild(style);
		}

		addListeners() {
			const chatRoomNotificationEl: HTMLElement = this.querySelector(
				".chatroom-notification"
			);

			const historyItemEl: NodeListOf<HTMLElement> =
				this.querySelectorAll(".history-item");

			historyItemEl.forEach((el) => {
				el.addEventListener("click", (e) => {
					const target = e.target as HTMLElement;
					const roomId = target.getAttribute("historialId");
					const chatRoomAccessPromise: Promise<AccessResponse> =
						state.getFirestoreChatRoom({
							id: roomId,
						});
					chatRoomAccessPromise.then((res) => {
						if (res.status == 200) {
							res.response.then((roomData) => {
								const currentChatRoomId = roomId;
								const secureChatRoomId =
									roomData.rtdbChatRoomId;
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
			});
		}
	}
);
