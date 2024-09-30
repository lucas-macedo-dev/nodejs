let x: number = 10;
let y: string = "teste";

let a = 10;
let b = "teste";

x = 16;
y += "2";
console.log(x);
console.log(y);

function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(1, 2));

function sayHelloTo(name: string): string {
  return `Hello ${name}`;
}

function greeting(name: string, greeting?: string): void {
  if (greeting) {
    console.log`Ola ${greeting} ${name}`;
  } else {
    console.log`Ola ${name}`;
  }
}

console.log(sayHelloTo("lucas"));
// comentario teste

function showArraysItems<T>(arr: T[]) {
  arr.forEach((item) => {
    console.log(`${item}`);
  });
}

const a1 = [1, 2, 3];
const a2 = ["a", "b", "c"];

showArraysItems(a2);

class User {
  name;
  role;
  isApproved;

  constructor(name: string, role: string, isApproved: boolean) {
    this.name = name;
    this.role = role;
    this.isApproved = isApproved;
  }

  showUserName() {
    console.log(`O nome do usuário é ${this.name}`);
  }

  showUserRole(canShow: boolean) {
    if (canShow) {
      console.log(`O usuário é ${this.role}`);
      return;
    }
    console.log("Informação confidencial");
  }
}

const teste = new User("teste", "admin", true);

teste.showUserRole(true);

interface IVehicle {
  brand: string;
  showBrand(): void;
}

class Car implements IVehicle {
  brand: string;
  wheels: number;
  constructor(brand: string, wheels: number) {
    this.brand = brand;
    this.wheels = wheels;
  }

  showBrand(): void {
    console.log(`A marca do carro é ${this.brand}`);
  }
}

const fusca = new Car("VW", 4);

fusca.showBrand();

class SuperCar extends Car {
  engine;
  constructor(brand: string, wheels: number, engine: number) {
    super(brand, wheels);
    this.engine = engine;
  }
}

const a4 = new SuperCar("Audi", 4, 2.0)

a4.showBrand();
