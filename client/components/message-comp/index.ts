import { state } from "../../state";

class MessageComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `

        .message-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .bubble-container {
            min-width: 20%;
            max-width: 45%;
            min-height: 35px;
            padding: 5px 10px;
            border: none;
            border-radius: 10px;
            background-color: #DFE0DF;
        }

        .bubble-container.sender {
            align-self: flex-end;
            background-color: #DFE0DF;
        }

        .bubble-container.receiver {
            align-self: flex-start;
            background-color: #FFC269;
        }

        .message__author {
            width: 100%;
            margin: 0;
            margin-top: 15px;
            margin-bottom: 5px;
            font-family: "Raleway", sans-serif;
            font-weight: 400;
            font-size: 12px;
            color: #EEEEEE;
        }

        .message__author.sender {
            text-align: right;
        }

        .message__content {
            width: 90%;
            margin: 5px;
            font-family: "Raleway", sans-serif;
            font-weight: 400;
            font-size: 12px;
            text-align: left;
            color: #000000;
        }
        `;

		this.render();
		this.shadow.appendChild(style);
	}

	checkMessageAuthor(author) {
		const currentState = state.getState();
		const currentUser = currentState.userData.name;
		if (author == currentUser) {
			return "sender";
		} else if (author !== currentUser) {
			return "receiver";
		}
	}

	render() {
		this.shadow.innerHTML = `
        <div class="message-wrapper">
            <p class="message__author
            ${this.checkMessageAuthor(this.getAttribute("messageAuthor"))}
            ">
                ${this.getAttribute("messageAuthor")}
            </p>
            <div class="bubble-container 
            ${this.checkMessageAuthor(this.getAttribute("messageAuthor"))}
            ">
                <p class="message__content">
                    ${this.textContent}
                </p>
            </div>
        <div>
        `;
	}
}
customElements.define("message-comp", MessageComponent);
