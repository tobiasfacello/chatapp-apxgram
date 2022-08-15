import { state } from "./state";
import "./router";

//? Pages
import "./pages/home/index";
import "./pages/register/index";
import "./pages/login/index";
import "./pages/lobby/index";
import "./pages/chat/index";

//? Components
import "./components/header-comp";
import "./components/registration-form";
import "./components/login-form";
import "./components/input-comp";
import "./components/btn-comp";
import "./components/modal-btn-comp";
import "./components/notification-comp";
import "./components/brand-comp";
import "./components/subtitle-comp";
import "./components/modal-text";
import "./components/small-text";
import "./components/footer-comp";

function main() {
	state.init();
}

main();
