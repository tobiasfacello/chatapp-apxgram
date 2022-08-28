import { Router } from "@vaadin/router";

const root = document.querySelector(".root");

const router = new Router(root);

router.setRoutes([
	{ path: "/", redirect: "/home" },
	{ path: "/home", component: "home-page" },
	{ path: "/register", component: "register-page" },
	{ path: "/login", component: "login-page" },
	{ path: "/lobby", component: "lobby-page" },
	{ path: "/chatroom/:roomId", component: "chatroom-page" },
	{ path: "/history", component: "history-page" },
	{ path: "/information", component: "information-page" },
]);
