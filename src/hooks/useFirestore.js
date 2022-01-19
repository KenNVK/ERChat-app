import React, { useState } from "react";
import { db } from "../firebase/config";
import { query, collection, orderBy, where, onSnapshot } from "@firebase/firestore";

const useFirestore = (collectionParam, condition) => {
    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = collection(db, collectionParam);

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]); //reset documents
                return;
            }
            collectionRef = query(
                collectionRef,
                orderBy("created"),
                where(condition.fieldName, condition.operator, condition.compareValue),
            );
        }
        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            const documents = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            setDocuments(documents);
        });
        return () => unsubscribe();
    }, [collectionParam, condition]);

    return documents;
};

export default useFirestore;