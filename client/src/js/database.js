import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Method for adding content to the DB
export const putDB = async (content) => {
  console.log("PUT to the database");

  const contentDB = await openDB("content", 1);

  const tx = contentDB.transaction("content", "readwrite");

  const store = tx.objectStore("content");

  const request = store.add({ content: content });

  const result = await request;

  console.log("🚀 - data saved to the database", result);
};

// Method for getting content from the DB
export const getDB = async () => {
  console.log("GET from the database");

  const contactDB = await openDB("content", 1);

  const tx = contactDB.transaction("content", "readonly");

  const store = tx.objectStore("content");

  const request = store.getAll();

  const result = await request;

  return result;
};

initdb();
