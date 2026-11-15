// exercise 1 - 3
const firstName = "Maksim";
const lastName = "Pisechkin";
const isStudent = true;

const age = 19;
const currentYear = 2026;
const birthYear = currentYear - age;

console.log(
  `Меня зовут ${firstName} ${lastName}, мне ${age} лет. Я ученик курса: ${isStudent}`,
);

// exercise 4
let a = "123";
// a = str
let b = +"456";
//  b = num
let c = 789;
// c = num
let d = Boolean(0);
//  d = false
let e = Boolean(" ");
// e = true
let result = a + b + c + d + e;
// a = str => result = str => result = 123456789falsetrue

// examination
console.log(result);
// result = 123456789falsetrue
