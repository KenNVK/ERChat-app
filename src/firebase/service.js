import firebase, { db } from "./config";

export const addDocument = (collection, data) => {
    const query = db.collection(collection);

    query.add({
        ...data,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};