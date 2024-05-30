let openDatabasePromise = null;

function openDatabase() {
  if (!openDatabasePromise) {
    openDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("ScreenTimeDB", 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("screenTimes")) {
          db.createObjectStore("screenTimes", { keyPath: "url" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }
  return openDatabasePromise;
}

function performTransaction(storeName, mode, operation) {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  });
}

export function addOrUpdateScreenTime(data) {
  return performTransaction("screenTimes", "readwrite", (store) =>
    store.put(data)
  );
}

export function getScreenTime(url) {
  return performTransaction("screenTimes", "readonly", (store) =>
    store.get(url)
  );
}

export function getAllScreenTimes() {
  return performTransaction("screenTimes", "readonly", (store) =>
    store.getAll()
  );
}

export function deleteDatabase() {
  const request = indexedDB.deleteDatabase("ScreenTimeDB");
  request.onsuccess = function(event) {
    console.log("Database deleted successfully");
  }
  request.onerror = function(event) {
    console.error("Error trying delete database", event.target.error);
  };
}