import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface PhotoDB extends DBSchema {
  photos: {
    key: string;
    value: {
      id: string;
      blob: Blob;
      timestamp: number;
      filterId: string;
      frameId: string;
    };
    indexes: { 'by-date': number };
  };
}

let dbPromise: Promise<IDBPDatabase<PhotoDB>> | null = null;

export const initDB = () => {
  if (typeof window === 'undefined') return null;
  if (!dbPromise) {
    dbPromise = openDB<PhotoDB>('photobooth-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('photos', {
          keyPath: 'id',
        });
        store.createIndex('by-date', 'timestamp');
      },
    });
  }
  return dbPromise;
};

export const savePhoto = async (
  blob: Blob,
  filterId: string,
  frameId: string
) => {
  const db = await initDB();
  if (!db) return;

  const id = crypto.randomUUID();
  const timestamp = Date.now();

  await db.put('photos', {
    id,
    blob,
    timestamp,
    filterId,
    frameId,
  });

  return id;
};

export const getAllPhotos = async () => {
  const db = await initDB();
  if (!db) return [];
  return await db.getAllFromIndex('photos', 'by-date');
};

export const getPhoto = async (id: string) => {
  const db = await initDB();
  if (!db) return null;
  return await db.get('photos', id);
};

export const deletePhoto = async (id: string) => {
  const db = await initDB();
  if (!db) return;
  await db.delete('photos', id);
};

export const clearAllPhotos = async () => {
  const db = await initDB();
  if (!db) return;
  await db.clear('photos');
};
