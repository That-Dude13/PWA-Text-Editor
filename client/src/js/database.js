import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const content = store.get(1)
  const result = await content;
  console.log('- data retrieved from the database', result.value);
  return result?.value;
};

initdb();









