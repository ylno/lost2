import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("no service account");
}
let app: admin.app.App;
if (admin.apps.length === 0) {
  // Keine App ist initialisiert
  app = admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
    ),
  });
} else {
  // Verwende die bereits initialisierte App
  app = admin.apps[0] as admin.app.App;
}
export const firestore = getFirestore(app);
console.log("firestore", firestore.databaseId);
// export default admin;
