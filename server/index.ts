import { firestoreDB, realtimeDB } from "./db";
import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const API_BASE_URL = "http://localhost:3000";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

function makeRandomId(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
}

app.post("/register", (req, res) => {
	const userName: string = req.body.username;
	const userEmail: string = req.body.email;
	const userPassword: string = req.body.password;

	const userDataRef = firestoreDB.collection("users");
	console.log(userDataRef);
	userDataRef
		.where("email", "==", userEmail)
		.get()
		.then((collectedUserData) => {
			if (collectedUserData.empty) {
				userDataRef
					.add({
						name: userName,
						email: userEmail,
						password: userPassword,
					})
					.then((newData) => {
						res.status(201).send({
							id: newData.id,
						});
					});
			} else {
				res.status(400).send(
					"El email ingresado pertenece a un usuario ya registrado."
				);
			}
		});
});

app.post("/chatroom", (req, res) => {
	const id = uuidv4();
	const IndChatroomRef = realtimeDB.ref(`/chatrooms/${id}`);
	IndChatroomRef.set(
		{
			friendlyId: makeRandomId(10),
			messages: [],
		},
		() => {
			res.send({ id });
		}
	);
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => console.log("Server running on port:", port));
