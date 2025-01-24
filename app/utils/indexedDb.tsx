import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'myDB';
const STORE_NAME = 'myStore';

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};


// Save data to IndexedDB
export const saveDataToDB = async (data: any) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put(data); // Save or update data
  await transaction.done;
};

// Retrieve data from IndexedDB
export const getDataFromDB = async () => {
  const db = await initDB();
  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  return store.getAll();
};

//Delete all data
export const deleteAllData = async () => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.clear(); // This will delete all data in the store
  await transaction.done;
};