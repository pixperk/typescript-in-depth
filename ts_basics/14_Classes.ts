// Define a Database interface with get and set methods
interface Database<T,K> {
    get(id: K): T;
    set(id: K, value: T): void;
  }
  
  // Define a Persistable interface with save and restore methods
  interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
  }
  
  type DBKeyType = string|number|symbol
  // Implement the Database interface in InMemoryDatabase class
  class InMemoryDatabase<T,K extends DBKeyType> implements Database<T,K> {
    // Use a protected property to store key-value pairs
    protected db: Record<K, T> = {} as Record<K,T>;
  
    // Implement the get method to retrieve a value by id
    get(id: K): T {
      return this.db[id];
    }
  
    // Implement the set method to store a value by id
    set(id: K, value: T): void {
      this.db[id] = value;
    }
  }
  
  // Extend InMemoryDatabase to add persistence functionality
  class PersistentMemoryDB<T,K extends DBKeyType> extends InMemoryDatabase<T,K> implements Persistable {
    // Implement saveToString to serialize the database to a string
    saveToString(): string {
      return JSON.stringify(this.db);
    }
  
    // Implement restoreFromString to deserialize a string to the database
    restoreFromString(storedState: string): void {
      this.db = JSON.parse(storedState);
    }
  }
  
  // Create an instance of PersistentMemoryDB and use it
  const myDB = new PersistentMemoryDB<number,string>();
  myDB.set("foo", 22); // Set a value in the database
  console.log(myDB.get("foo")); // Get and print the value
  console.log(myDB.saveToString()); // Save and print the serialized database state
  
  // Save the current state of the database
  const saved = myDB.saveToString();
  
  // Modify the database and print the updated value
  myDB.set("foo", 76);
  console.log(myDB.get("foo"));
  
  // Create a new instance and restore the saved state
  const myDB2 = new PersistentMemoryDB<number,string>();
  myDB2.restoreFromString(saved); // Restore the saved state
  console.log(myDB2.get("foo")); // Get and print the restored value
  