import { realtimeDBClient } from "./db";

const API_BASE_URL = "https://apxgram-chatapp.onrender.com";

type SignUpData = {
	name: string;
	email: string;
	password: string;
};

type SignInData = {
	email: string;
	password: string;
};

type chatRoomData = {
	currentChatRoomId: string;
	secureChatRoomId: string;
	messages: [];
};

type userData = {
	name: string;
};

type Message = {
	from: string;
	content: string;
};

export const state = {
	data: {
		previousLocation: {
			locationBeforeLobby: "",
		},
		userData: {
			name: "",
		},
		currentChatRoomData: {
			currentChatRoomId: "",
			secureChatRoomId: "",
			messages: [""],
		},
		idsHistory: [],
	},
	listeners: [],

	initChatRoom(chatRoomId) {
		const chatRoomsRef = realtimeDBClient.ref(`/chatrooms/${chatRoomId}`);
		chatRoomsRef.on("value", (snap) => {
			const currentState = this.getState();
			const snapData = snap.val();
			currentState.currentChatRoomData.messages = snapData.messages;
			this.setState(currentState);
		});
	},

	initLocalStorage() {
		const localData = JSON.parse(localStorage.getItem("data-cache"));
		if (!localData) {
			return;
		} else {
			this.setState(localData);
		}
	},

	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},

	getState() {
		return this.data;
	},

	setState(newState: {}) {
		this.data = newState;
		for (const callback of this.listeners) {
			callback();
		}
		localStorage.setItem("data-cache", JSON.stringify(newState));
	},

	setPreviousLocation(path: string) {
		const currentState = this.getState();
		currentState.previousLocation.locationBeforeLobby = path;
		this.setState(currentState);
	},

	getPreviousLocation() {
		const currentState = this.getState();
		return currentState.previousLocation.locationBeforeLobby;
	},

	setUserData(userData: userData) {
		const currentState = this.getState();
		currentState.userData = userData;
		this.setState(currentState);
	},

	getUserData() {
		const currentState = this.getState();
		const userData = currentState.userData;
		return userData;
	},

	setChatRoomHistory(chatRoomData: chatRoomData) {
		const currentState = this.getState();

		if (currentState.idsHistory !== []) {
			const itemExists = currentState.idsHistory.find((item) => {
				return item.currentChatRoomId == chatRoomData.currentChatRoomId;
			});
			if (itemExists == undefined) {
				currentState.idsHistory.push(chatRoomData);
			}
			this.setState(currentState);
		} else {
			currentState.idsHistory.push(chatRoomData);
		}
		this.setState(currentState);
	},

	getChatRoomHistory() {
		const currentState = this.getState();
		const history = currentState.idsHistory;
		return history;
	},

	setCurrentChatRoomData(chatRoomData) {
		const currentState = this.getState();
		currentState.currentChatRoomData = chatRoomData;
		this.setState(currentState);
	},

	getCurrentChatRoomData() {
		const currentState = this.getState();
		const chatRoomData = currentState.currentChatRoomData;
		return chatRoomData;
	},

	pushNewMessage(message: Message) {
		const currentState = this.getState();
		currentState.currentChatRoomData.messages.push(message);
		this.setState(currentState);
	},

	async postSignUpForm(newUserData: SignUpData) {
		const res = await fetch(`${API_BASE_URL}/users/sign-up`, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newUserData),
		});
		return { response: res.json(), status: res.status };
	},

	async postSignInForm(userData: SignInData) {
		const res = await fetch(`${API_BASE_URL}/users/sign-in`, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(userData),
		});
		return { response: res.json(), status: res.status };
	},

	async createNewChatRoom() {
		const res = await fetch(`${API_BASE_URL}/chatrooms`, {
			method: "post",
		});
		return { response: res.json(), status: res.status };
	},

	async getFirestoreChatRoom(roomId: { id: string }) {
		const res = await fetch(`${API_BASE_URL}/fsdb/chatrooms/${roomId.id}`, {
			method: "get",
		});
		return { response: res.json(), status: res.status };
	},

	async getRealtimeChatRoom(secureRoomId: { id: "string" }) {
		const res = await fetch(
			`${API_BASE_URL}/rtdb/chatrooms/${secureRoomId.id}`,
			{
				method: "get",
			}
		);
		return { response: res.json(), status: res.status };
	},

	async postRealtimeChatRoom(
		secureRoomId: { id: "string" },
		newChatRoomData: { message: Message }
	) {
		await fetch(`${API_BASE_URL}/rtdb/chatrooms/${secureRoomId.id}`, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newChatRoomData),
		});
	},
};
