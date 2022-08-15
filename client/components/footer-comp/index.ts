import { Router } from "@vaadin/router";

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
            width: 100vw;
            height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: rgba(46, 47, 47, 0.8);
            border: none;
            border-radius: 20px 20px 0 0;
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
		const tabBarItemsEl: NodeListOf<Element> =
			this.shadow.querySelectorAll(".item-icon");
		const homeIconEl: HTMLElement = this.shadow.querySelector(".home-icon");
		const chatIconEl: HTMLElement = this.shadow.querySelector(".chat-icon");
		const historyIconEl: HTMLElement =
			this.shadow.querySelector(".history-icon");

		tabBarItemsEl.forEach((item) => {
			item.addEventListener("click", (e) => {
				const target = e.target as HTMLElement;
				if (target.classList.contains("home-icon")) {
					Router.go("/home");
					homeIconEl.setAttribute("src", `${homeActiveIcon}`);
					chatIconEl.setAttribute("src", `${chatIcon}`);
					historyIconEl.setAttribute("src", `${historyIcon}`);
				} else if (target.classList.contains("chat-icon")) {
					Router.go("/chat");
					chatIconEl.setAttribute("src", `${chatActiveIcon}`);
					homeIconEl.setAttribute("src", `${homeIcon}`);
					historyIconEl.setAttribute("src", `${historyIcon}`);
				} else if (target.classList.contains("history-icon")) {
					Router.go("/history");
					homeIconEl.setAttribute("src", `${homeIcon}`);
					chatIconEl.setAttribute("src", `${chatIcon}`);
					historyIconEl.setAttribute("src", `${historyActiveIcon}`);
				}
			});
		});
	}
}
customElements.define("footer-comp", FooterComponent);
