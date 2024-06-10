//function in function
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger("myString");

//function creating a class
function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      console.log(str);
      this.completeLog += str + "\n";
    }
    dumplog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log("Foo");
console.log(logger2.dumplog());

function createSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};
    set(id: string, value: T): void {
      this.db[id] = value;
    }
    get(id: string): T {
      return this.db[id];
    }
    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = createSimpleMemoryDatabase<string>();
const sdb1 = new StringDatabase();
sdb1.set("a", "hello");

type Constructor<T> = new (...args: any[]) => T; // represents any constructor that can take any number of arguments (...args: any[]) and returns an instance of type T.

function Dumpable<
  T extends Constructor<{
    getObject(): object;
  }>
>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

/* {}: This is an object type literal that represents a type that has properties.
getObject(): object: This is a method declaration that specifies the method getObject should return an object.
So, the entire syntax <{ getObject(): object; }> means that the constructor type T must have a method named getObject that returns an object. */

const DumpableStringDataBase = Dumpable(StringDatabase)
const sdb2 = new DumpableStringDataBase();
sdb2.set("key", "value");
sdb2.dump()