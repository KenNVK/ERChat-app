import React, { useState } from "react";
import { db } from "../firebase/config";

export const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);
  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createAt");
    ///condition

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
    }
    const unsubscribed = collectionRef.onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsubscribed;
  }, [collection, condition]);
  return documents;
};

export default useFirestore;
