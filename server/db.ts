import * as admin from "firebase-admin";
import * as firebaseKey from "./key.json";

admin.initializeApp({
	credential: admin.credential.cert(firebaseKey as any),
	databaseURL: "https://apx-dwf-m6-firestore-default-rtdb.firebaseio.com",
});

const firestoreDB = admin.firestore();
const realtimeDB = admin.database();

export { firestoreDB, realtimeDB };
