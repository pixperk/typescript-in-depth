// Abstract class StreetFighter serves as a blueprint for other classes
abstract class StreetFighter {
    constructor() {}

    // Method that all subclasses can use
    move() {}

    // Method that uses abstract properties and methods
    fight() {
        console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
    }

    // Abstract method that must be implemented by subclasses
    abstract getSpecialAttack(): string;
    
    // Abstract getter that must be implemented by subclasses
    abstract get name(): string;
}

//const fighter = new StreetFighter() (not possible)

// Ryu class extends StreetFighter and implements the abstract methods
class Ryu extends StreetFighter {
    // Implementing the abstract method from StreetFighter
    getSpecialAttack(): string {
        return "Hadoken";
    }

    // Implementing the abstract getter from StreetFighter
    get name(): string {
        return "Ryu";
    }
}

// ChunLi class extends StreetFighter and implements the abstract methods
class ChunLi extends StreetFighter {
    // Implementing the abstract method from StreetFighter
    getSpecialAttack(): string {
        return "Lightning Kick";
    }

    // Implementing the abstract getter from StreetFighter
    get name(): string {
        return "Chun-Li";
    }
}

// Creating instances of Ryu and ChunLi
const ryu = new Ryu();
const chunli = new ChunLi();

// Calling the implemented methods
console.log(ryu.getSpecialAttack()); // Outputs: Hadoken
ryu.fight(); // Outputs: Ryu attack with Hadoken
chunli.fight(); // Outputs: Chun-Li attack with Lightning Kick

// Summary about Abstract Classes and Methods
/*
Summary:
- **Abstract Classes**: 
  - Abstract classes provide a way to define a base class with some shared implementation and abstract methods/properties that must be implemented by subclasses.
  - An abstract class cannot be instantiated directly. It is meant to be extended by other classes.
  - It can contain both abstract members (methods and properties) that must be implemented by subclasses and concrete members (methods and properties) that provide shared functionality.

- **Abstract Methods and Properties**:
  - Abstract methods and properties are declared without an implementation in the abstract class.
  - Subclasses that extend the abstract class are required to provide an implementation for these abstract members.
  - This enforces a contract for the subclasses, ensuring they implement specific functionality defined by the abstract class.

- **Usage in this Example**:
  - The `StreetFighter` abstract class defines the structure for a street fighter with methods `move()`, `fight()`, and abstract members `getSpecialAttack()` and `name`.
  - The `Ryu` and `ChunLi` classes extend `StreetFighter`, providing specific implementations for `getSpecialAttack()` and `name`.
  - The abstract class enables polymorphism, allowing us to call `fight()` on instances of `Ryu` and `ChunLi` and have the correct `getSpecialAttack()` method executed.
*/
