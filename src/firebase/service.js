import db from "./config";

const query = (collection, data) => {
    db.collection(collection).add({
        displayName: data.user.displayName,
        email: data.user.email,
        uid: data.user.uid,
        photoURL: data.user.photoURL,
        providerId: data.additionalUserInfo.providerId,
    });
};