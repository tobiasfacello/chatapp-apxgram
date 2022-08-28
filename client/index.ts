import { state } from "./state";
import "../server/router";

//? Pages
import "./pages/home/index";
import "./pages/register/index";
import "./pages/login/index";
import "./pages/lobby/index";
import "./pages/chatroom/index";
import "./pages/history/index";
import "./pages/information/index";

//? Components
import "./components/header-comp";
import "./components/registration-form";
import "./components/login-form";
import "./components/btn-comp";
import "./components/modal-btn-comp";
import "./components/notification-comp";
import "./components/message-comp";
import "./components/brand-comp";
import "./components/subtitle-comp";
import "./components/modal-text";
import "./components/small-text";
import "./components/user-profile";
import "./components/hist-item-comp";
import "./components/footer-comp";

function main() {
	state.initLocalStorage();
}

main();
