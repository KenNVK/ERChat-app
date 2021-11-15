import { db } from "./config";
import { addDoc, Timestamp, collection } from "@firebase/firestore";

export const addDocument = async (collectionParam, data) => {
  await addDoc(collection(db, collectionParam), {
    ...data,
    created: Timestamp.fromDate(new Date()),
  });
};

// Create keywords for displayName, use for  search function
export const generateKeywords = displayName => {
  // list all permutations(hoán vị, 置換). EX: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(" ").filter(word => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * initialize array with flag is false
   * used to mark whether the value at this position has been used or not
   **/

  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = name => {
    const arrName = [];
    let curName = "";
    name.split("").forEach(letter => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
