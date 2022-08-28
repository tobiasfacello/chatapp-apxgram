import * as admin from "firebase-admin";

const firebaseKey = JSON.parse(process.env.API_CREDENTIALS);

admin.initializeApp({
	credential: admin.credential.cert(firebaseKey),
	databaseURL: "https://apx-dwf-m6-firestore-default-rtdb.firebaseio.com",
});

const firestoreDB = admin.firestore();
const realtimeDB = admin.database();

export { firestoreDB, realtimeDB };
