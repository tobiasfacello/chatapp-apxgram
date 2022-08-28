import { Router } from "@vaadin/router";
import { state } from "../../state";

const homeIcon = require("url:../../assets/home.svg");
const homeActiveIcon = require("url:../../assets/home-active.svg");
const chatIcon = require("url:../../assets/message-text.svg");
const chatActiveIcon = require("url:../../assets/message-text-active.svg");
const historyIcon = require("url:../../assets/history.svg");
const historyActiveIcon = require("url:../../assets/history-active.svg");

class FooterComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        .footer {
			max-width: 500px;
            width: 100vw;
            height: 80px;
			margin: 0 auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: rgba(46, 47, 47, 0.8);
            border: none;
            border-radius: 20px 20px 0 0;
        }

		@media (min-width: 768px) {
			.footer {
				height: 60px;
			}
		}

        .tabbar {
            width: 100%;
            padding: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            list-style: none;
        }

        .item-icon {
            width: 30px;
        }

		.item-icon:hover {
			cursor: pointer;
		}
        `;

		this.render();
		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
        <footer class="footer">
        <ul class="tabbar">
            <li class="tabbar__item">
                <img class="item-icon home-icon" src="${homeActiveIcon}">
            </li>
            <li class="tabbar__item">
                <img class="item-icon chat-icon" src="${chatIcon}">
            </li>
            <li class="tabbar__item">
                <img class="item-icon history-icon" src="${historyIcon}">
            </li>
        </ul>
        </footer>
        `;
	}

	addListeners() {
		const bodyEl: HTMLBodyElement = document.querySelector("body");

		const headerEl: HTMLElement = bodyEl.querySelector(".header");

		const returnModalEl: HTMLElement =
			headerEl.shadowRoot.querySelector(".return-modal");

		const returnButtonEl: HTMLButtonElement =
			returnModalEl.shadowRoot.querySelector(".return-button");

		const tabBarItemsEl: NodeListOf<Element> =
			this.shadow.querySelectorAll(".item-icon");

		const homeIconEl: HTMLElement = this.shadow.querySelector(".home-icon");

		const chatIconEl: HTMLElement = this.shadow.querySelector(".chat-icon");

		const historyIconEl: HTMLElement =
			this.shadow.querySelector(".history-icon");

		function goToLobbyPage() {
			Router.go("/lobby");
			homeIconEl.setAttribute("src", `${homeActiveIcon}`);
			chatIconEl.setAttribute("src", `${chatIcon}`);
			historyIconEl.setAttribute("src", `${historyIcon}`);
		}

		function goToLogInPage() {
			Router.go("/login");
			homeIconEl.setAttribute("src", `${homeActiveIcon}`);
			chatIconEl.setAttribute("src", `${chatIcon}`);
			historyIconEl.setAttribute("src", `${historyIcon}`);
		}

		function goToChatRoomPage() {
			const chatRoomData = state.getCurrentChatRoomData();
			const currentChatRoomId = chatRoomData.currentChatRoomId;
			Router.go(`/chatroom/${currentChatRoomId}`);
			chatIconEl.setAttribute("src", `${chatActiveIcon}`);
			homeIconEl.setAttribute("src", `${homeIcon}`);
			historyIconEl.setAttribute("src", `${historyIcon}`);
		}

		function goToHistoryPage() {
			Router.go("/history");
			homeIconEl.setAttribute("src", `${homeIcon}`);
			chatIconEl.setAttribute("src", `${chatIcon}`);
			historyIconEl.setAttribute("src", `${historyActiveIcon}`);
		}

		tabBarItemsEl.forEach((item) => {
			item.addEventListener("click", (e) => {
				const target = e.target as HTMLElement;
				if (
					target.classList.contains("home-icon") &&
					(location.pathname == "/lobby" ||
						location.pathname == "/information")
				) {
					returnButtonEl.click();
				} else if (
					target.classList.contains("home-icon") &&
					(location.pathname.startsWith("/chatroom") ||
						location.pathname == "/history")
				) {
					goToLobbyPage();
				} else if (
					target.classList.contains("chat-icon") &&
					(location.pathname == "/home" ||
						location.pathname == "/information")
				) {
					goToLogInPage();
				} else if (
					target.classList.contains("chat-icon") &&
					location.pathname !== "/home" &&
					location.pathname !== "/lobby"
				) {
					goToChatRoomPage();
				} else if (
					target.classList.contains("history-icon") &&
					(location.pathname == "/home" ||
						location.pathname == "/information")
				) {
					goToLogInPage();
				} else if (
					target.classList.contains("history-icon") &&
					location.pathname !== "/home" &&
					(location.pathname == "/lobby" ||
						location.pathname.startsWith("/chatroom") ||
						location.pathname == "/information")
				) {
					goToHistoryPage();
				}
			});
		});

		window.addEventListener("hashchange", () => {
			if (location.pathname == "/home") {
				homeIconEl.setAttribute("src", `${homeActiveIcon}`);
				chatIconEl.setAttribute("src", `${chatIcon}`);
				historyIconEl.setAttribute("src", `${historyIcon}`);
			} else if (location.pathname.startsWith("/chatroom")) {
				homeIconEl.setAttribute("src", `${homeIcon}`);
				chatIconEl.setAttribute("src", `${chatActiveIcon}`);
				historyIconEl.setAttribute("src", `${historyIcon}`);
			} else if (location.pathname == "/history") {
				homeIconEl.setAttribute("src", `${homeIcon}`);
				chatIconEl.setAttribute("src", `${chatIcon}`);
				historyIconEl.setAttribute("src", `${historyActiveIcon}`);
			}
		});
	}
}

customElements.define("footer-comp", FooterComponent);
