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

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export function used to PUT to database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database using database and version
  const jateDb = await openDB('jate', 1);

  // Create new transaction and speciy database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up specific object store
  const store = tx.objectStore('jate');

  // Get confirmation of request
  const request = store.put({ id: 1, content: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  // Create a connection to the database using database and version
  const jateDb = await openDB('jate', 1);

  // Create new transaction and specify database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up specific object store
  const store = tx.objectStore('jate');

  // Get confirmation of request
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
