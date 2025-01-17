import { openDB, IDBPDatabase } from 'idb';
let dbPromise: Promise<IDBPDatabase<any>> | undefined;


export async function getDB(): Promise<IDBPDatabase<any>> {
  console.log("db dbPromise",dbPromise)
  if (!dbPromise) {
    dbPromise = openDB('MyAdamsDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('storeName')) {
          db.createObjectStore('storeName', { keyPath: 'id' }); // 'id' is the primary key
        }
      },
    });
    console.log("dbPromise",dbPromise)
  }
  return dbPromise;
}


export async function addData(storeName: string, data: any): Promise<void> {
  const db = await getDB();
  await db.add(storeName, data);
}

export async function getData(storeName: string, key: IDBValidKey): Promise<any> {
  const db = await getDB();
  return db.get(storeName, key);
}

export async function getAllData(storeName: string): Promise<any[]> {
  const db = await getDB();
  return db.getAll(storeName);
}

export async function deleteData(storeName: string, key: IDBValidKey): Promise<void> {
  const db = await getDB();
  await db.delete(storeName, key);
}
