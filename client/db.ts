import firebase from "firebase";

firebase.initializeApp({
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DB_URL,
});

const realtimeDBClient = firebase.database();

export { realtimeDBClient };
