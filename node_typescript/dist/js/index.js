"use strict";
let x = 10;
let y = "teste";
let a = 10;
let b = "teste";
x = 16;
y += "2";
console.log(x);
console.log(y);
function sum(a, b) {
    return a + b;
}
console.log(sum(1, 2));
function sayHelloTo(name) {
    return `Hello ${name}`;
}
function greeting(name, greeting) {
    if (greeting) {
        console.log `Ola ${greeting} ${name}`;
    }
    else {
        console.log `Ola ${name}`;
    }
}
console.log(sayHelloTo("lucas"));
function showArraysItems(arr) {
    arr.forEach((item) => {
        console.log(`${item}`);
    });
}
const a1 = [1, 2, 3];
const a2 = ["a", "b", "c"];
showArraysItems(a2);
class User {
    constructor(name, role, isApproved) {
        this.name = name;
        this.role = role;
        this.isApproved = isApproved;
    }
    showUserName() {
        console.log(`O nome do usuário é ${this.name}`);
    }
    showUserRole(canShow) {
        if (canShow) {
            console.log(`O usuário é ${this.role}`);
            return;
        }
        console.log("Informação confidencial");
    }
}
const teste = new User("teste", "admin", true);
teste.showUserRole(true);
class Car {
    constructor(brand, wheels) {
        this.brand = brand;
        this.wheels = wheels;
    }
    showBrand() {
        console.log(`A marca do carro é ${this.brand}`);
    }
}
const fusca = new Car("VW", 4);
fusca.showBrand();
class SuperCar extends Car {
    constructor(brand, wheels, engine) {
        super(brand, wheels);
        this.engine = engine;
    }
}
const a4 = new SuperCar("Audi", 4, 2.0);
a4.showBrand();
