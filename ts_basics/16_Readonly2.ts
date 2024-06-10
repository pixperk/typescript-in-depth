/* https://www.perplexity.ai/search/PLNqp92EXZBJYFr-Explain-this-Ut16r2LfTRWxvacIX5gnEw
 */
class Doggy {
  constructor(public readonly name: string, public age: number) {}
}

const lilGuy = new Doggy("LG", 13);
console.log(lilGuy.name);

/* Static Member Fields and Methods: Static member fields and methods belong to the class itself, not individual instances. They can be accessed directly using the class name, without creating an instance. */

//singleton
class DogList {
  private doggies: Doggy[] = [];
  static instance: DogList = new DogList();//(Singleton instance) static so that we have the access of this through the class
  private constructor(){}//does not let create any new instance of the class

/*   public addDog(dog:Doggy){
    this.doggies.push(dog) */

  static addDog(dog:Doggy){
    DogList.instance.doggies.push(dog) //this in static refers to class not the instance created by it
  }

  getDogs(){
    return this.doggies
  }
}

DogList.addDog(lilGuy)
console.log(DogList.instance.getDogs())

/* Summary
-The Doggy class defines a dog with a name and age.
-The DogList class uses the singleton pattern to manage a single list of Doggy instances.
-Static methods in DogList operate on the singleton instance to modify or access the list of dogs.
-Static methods can't directly access instance properties using this because this in static context refers to the class itself, not an instance. This is why DogList.instance is used to manipulate the singleton instance's properties. */