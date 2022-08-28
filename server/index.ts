import { firestoreDB, realtimeDB } from "./db";
import * as express from "express";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const usersDataRef = firestoreDB.collection("users");
const chatRoomsRef = firestoreDB.collection("chatrooms");

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

//? Devuelve la data de la colección "users"
app.get("/users", (req, res) => {
	usersDataRef.get().then((usersData) => {
		const docs = usersData.docs;
		const users = docs.map((doc) => {
			return doc.data();
		});
		res.send({
			...users,
		});
	});
});

//? Devuelve la data de un usuario en específico.
app.get("/users/:id", (req, res) => {
	const userDocId = req.params.id;
	const userDoc = usersDataRef.doc(`${userDocId}`);
	userDoc.get().then((userDocSnap) => {
		if (userDocSnap.id == userDocId) {
			const snapData = userDocSnap.data();
			res.status(200).send({
				...snapData,
			});
		}
	});
});

//? Crea un usuario a partir del formulario de registro.
app.post("/users/sign-up", (req, res) => {
	const userName: string = req.body.name;
	const userEmail: string = req.body.email;
	const userPassword: string = req.body.password;

	usersDataRef
		.where("email", "==", userEmail)
		.get()
		.then((collectedUserData) => {
			if (collectedUserData.empty) {
				usersDataRef
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
				res.status(409).send({
					message:
						"El email ingresado pertenece a un usuario ya registrado. Por favor, dirijase a 'Iniciar sesión'.",
				});
			}
		});
});

//? Autentica un usuario mediante el formulario de inicio de sesión.
app.post("/users/sign-in", (req, res) => {
	const userEmail = req.body.email;
	const userPassword = req.body.password;
	usersDataRef
		.where("email", "==", userEmail)
		.where("password", "==", userPassword)
		.get()
		.then((collectedUserData) => {
			if (collectedUserData.empty) {
				res.status(404).send({
					message:
						"El correo o contraseña son incorrectos, por favor ingrese los datos nuevamente, de lo contrario, dirijase a 'Registrarse'.",
				});
			} else if (collectedUserData.docs) {
				res.status(200).send({
					message:
						"Usuario encontrado. Sesión iniciada correctamente.",
				});
			}
		});
});

//? Crea un nuevo chatroom.
app.post("/chatrooms", (req, res) => {
	const id = uuidv4();
	const friendlyId = makeRandomId(10);

	const rtdbChatRoomRef = realtimeDB.ref(`/chatrooms/${id}`);
	const rtdbChatRoomId = rtdbChatRoomRef.key;
	rtdbChatRoomRef.set({
		owner: "",
		messages: [""],
	});

	const newChatRoom = chatRoomsRef.doc(`${friendlyId}`);
	newChatRoom
		.set({
			rtdbChatRoomId,
		})
		.then(() => {
			res.status(201).send({
				roomId: friendlyId,
				rtdbChatRoomId,
			});
		});
});

//* Firestore
//? Devuelve la data de un chatroom en específico.
app.get("/fsdb/chatrooms/:id", (req, res) => {
	const chatRoomId = req.params.id;
	const chatRoomDoc = chatRoomsRef.doc(`${chatRoomId}`);
	chatRoomDoc.get().then((docSnap) => {
		if (docSnap.exists) {
			const snapData = docSnap.data();
			res.status(200).send({
				...snapData,
			});
		} else {
			res.status(404).send({
				message:
					"ID de sala incorrecto. Compruebe que el ID se ingresó correctamente de lo contrario cree una sala",
			});
		}
	});
});

//* Realtime
//? Devuelve la data de un chatroom en específico.
app.get("/rtdb/chatrooms/:id", (req, res) => {
	const secureChatRoomId = req.params.id;
	const chatRoomRef = realtimeDB.ref(`/chatrooms/${secureChatRoomId}`);
	chatRoomRef.get().then((snap) => {
		const snapData = snap.val();
		if (snapData.messages !== undefined) {
			res.status(200).send({
				...snapData,
			});
		} else {
			res.status(404).send({
				message: "No se encontró la sala o no contiene mensajes.",
			});
		}
	});
});

//? Setea la data nueva recuperada desde el cliente a un chatroom específico.
app.post("/rtdb/chatrooms/:id", (req, res) => {
	const secureChatRoomId = req.params.id;
	const chatRoomMessage = req.body.message;
	const chatRoomRef = realtimeDB.ref(
		`/chatrooms/${secureChatRoomId}/messages`
	);
	chatRoomRef.push(chatRoomMessage);
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => console.log("Server running on port:", port));
