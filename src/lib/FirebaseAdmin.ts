import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("no service account");
}
export const app = admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
  ),
});

export const firestore = getFirestore(app);
console.log("firestore", firestore.databaseId);
// export default admin;
