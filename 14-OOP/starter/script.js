'use strict';

// const Person = function (firstName, birthYear) {
//   // instance properties:
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   //   Never do this:
//   //   this.calcAge = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };
// };

// const jonas = new Person('Jonas', 1991);

// console.log(jonas);

// // How "new" operator works:
// // 1. New empty object is created
// // 2. the constructor function is called, and the this keyword in the constructor function is set to the new object
// // 3. empty object is linked to the prototype: this step creates the object's prototype property(__proto__) and sets the proto property on the object equal to the prototype property of the constructor function. this is how js knows internally, that the object is connected to the constructorFxn.prototype. __proto__ always points to an object's prototype
// // 4. function automatically returns the new object, unless we explicitly return something else.

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);
// console.log(jonas instanceof Person);

// // Writing a static method:

// Person.hey = function () {
//   console.log('Hey there! 👋🏿');
//   console.log(this);
// };

// Person.hey();

// ///////////////////////////////////////////////////////////////
// // Prototypes
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// jonas.calcAge();

// console.log(jonas.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas);

// console.log(jonas.hasOwnProperty('firstName'));
// console.log(jonas.hasOwnProperty('species'));

// console.log(jonas.__proto__);
// // Object.protoype: (top of the prototype chain)
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [2, 56, 24, 56, 2, 3, 23];
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

// // Coding Challenge #1: OOP

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} accelerated to ${this.speed} km/h.`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} slowed down to ${this.speed} km/h.`);
};

// const bmw = new Car('BMW', 120);
// const merc = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

// merc.accelerate();
// merc.accelerate();
// merc.brake();
// merc.accelerate();
// merc.accelerate();

// // UNIT:  ES6 Classes

// class expression:
// const personCl = class {};

// class declaration:
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // Instance methods:
//   //   all the methods that we write in the class outslide of the constructor will be on the proto of the object, and not on the object itself: Method will be added to .protoype property of the person Class
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet2() {
//     console.log(`Hey, ${this.fullName}! How's it going?`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   //   setting a property that already exists
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name.`);
//   }

//   set birthYear(year) {
//     console.log(`You were born in ${year}, you're old.`);
//   }

//   get fullName() {
//     return this._fullName;
//   }
//   //  static method:
//   static hey() {
//     console.log('Hey there! 👋🏿');
//     console.log(this);
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1993);
// console.log(jessica);
// jessica.calcAge();
// console.log(jessica.age);

// console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey, ${this.fullName}!`);
// };

// jessica.greet();
// jessica.greet2();

// const walter = new PersonCl('Walter White', 1965);

// PersonCl.hey();

// // subunit: getters and setters

// const account = {
//   owner: 'Jonas',
//   movements: [233, 50, 90, 55],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// // UNIT: Object.create()

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// steven.name = 'Steven';
// steven.birthYear = 1990;
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();

// // Coding Challenge #2:

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.speed);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const beamer = new CarCl('BMW', 120);
// beamer.accelerate();
// beamer.accelerate();
// beamer.accelerate();
// beamer.brake();
// beamer.brake();

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS);

// ford.speedUS = 100;
// console.log(ford);

// UNIT: Inheritance between classes using constructor functions:

const Person = function (firstName, birthYear) {
  // instance properties:
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // note: 1. linking parent class with child class
  this.course = course;
};

//  note 2. Linking prototypes so that the prototype of Student is Person.prototype (but not the same object)
Student.prototype = Object.create(Person.prototype);

// note 3. adding methods to the child prototype. HAS TO BE IN THIS ORDER
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.calcAge();
mike.introduce();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(mike.__proto__.constructor);

// Coding Challenge #3:

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} accelerated to ${this.speed} km/h.`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} slowed down to ${this.speed} km/h.`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
//   console.log(`The ${this.make} now has a battery charge of ${chargeTo}%.`);
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge -= 1;
//   console.log(
//     `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%.`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(90);

// UNIT: Inheritance b/w classes using ES6 Classes:

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet2() {
    console.log(`Hey, ${this.fullName}! How's it going?`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name.`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there! 👋🏿');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `My name is ${this.fullName}, I'm ${this.age} and I study ${this.course}.`
    );
  }

  calcAge() {
    console.log(
      `I'm ${this.age} years old, but as a student, I feel ${this.age + 20}.`
    );
  }
}

const martha = new StudentCl('Martha Jon', 2000, 'Biology');
martha.calcAge();
martha.introduce();

const vray = new StudentCl('Vray Blah', 1993, 'Architecture');
vray.calcAge();
vray.introduce();

// UNIT: Inheritance b/s classes, using Object.create():

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName}, and I study ${this.course}.`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2008, 'Computer Science');
jay.calcAge();
jay.introduce();

// UNIT: Another Class Example & Encapsulation:

// 8 different kinds of fields and methods:
// 1) Public Fields (will be common for all instances)
// 2) Private Fields (will be common for all instances)
// 3) Public Methods
// 4) Private Methods
// (then the same four but for static)

class Account {
  // 1) Defining a public field:
  locale = navigator.language;

  // 2) Defining private fields:
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // protected property:
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}!`);
  }

  // 3) Public methods
  // this is the public interface of our object:
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved!');
    }

    return this;
  }

  _approveLoan(val) {
    return true;
  }

  static helper() {}
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(100);
acc1.withdraw(200);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);

// console.log(acc1.#movements);

Account.helper();

// UNIT: Chaining Methods:

acc1
  .deposit(300)
  .withdraw(200)
  .deposit(500)
  .withdraw(35)
  .requestLoan(25000)
  .withdraw(4000);
console.log(acc1.getMovements());

// Coding Challenge #4:

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const tesla = new EVCl('Tesla', 120, 23);

tesla.accelerate().accelerate().accelerate();

const rivian = new EVCl('Rivian', 120, 23);
rivian.chargeBattery(100).accelerate().accelerate().brake();
console.log((rivian.speedUS = 100));
