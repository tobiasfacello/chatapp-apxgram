export const alienEmoji = require("url:../../assets/alien.png");

class UserProfileComponent extends HTMLElement {
	shadow = this.attachShadow({ mode: "open" });
	constructor() {
		super();

		let style = document.createElement("style");
		style.textContent = `
        
        .user-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: cener;
        }

        .picture-wrapper {
            width: 30px;
            height: 30px;
            margin: 0 auto;
            padding: 10px;
            background: linear-gradient(180deg, #EDFC74 0%, #F5FFA8 100%);
            border: none;
            border-radius: 50px;
        }

        .user__profile-pic {
            width: 100%;
            height: 100%;
        }

        .user__name {
            width: 100%;
            margin: 5px 0;
            font-family: "Raleway", sans-serif;
            font-weight: 400;
            font-size: 16px;
            text-align: center;
            color: #FFFFFF;
        }
		`;

		this.render();
		this.shadow.appendChild(style);
		this.addListeners();
	}

	render() {
		this.shadow.innerHTML = `
            <div class="user-container">
                <div class="picture-wrapper">
                    <img src="${alienEmoji}" class="user__profile-pic" alt="User Profile">
                </div>
                <h3 class="user__name">${this.textContent}</h3>
            </div>
        `;
	}

	addListeners() {}
}
customElements.define("user-profile", UserProfileComponent);
