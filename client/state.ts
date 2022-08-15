export const state = {
	data: {
		previousLocation: {
			locationBeforeLobby: "",
		},
	},

	init() {
		const localData = JSON.parse(localStorage.getItem("state-cache"));
		if (!localData) {
			return;
		} else {
			this.setState(localData);
		}
	},

	getState() {
		return this.data;
	},

	setState(newState: {}) {
		this.data = newState;
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
};

// function connectToChatroom() {
// 	fetch(`${API_BASE_URL}/chatroom`, { method: "post" })
// 		.then((res) => res.json())
// 		.then((data) => {
// 			console.log(data);
// 			const chatroomsRef = realtimeDB.ref(`/chatrooms/${data.id}`);
// 			chatroomsRef.on("value", (snap) => {
// 				const snapData = snap.val();
// 				console.log(snapData);
// 			});
// 		});
// }
