// exercise 1
const number = +prompt("Введи число");

if (!isNaN(number)) {
  if (number % 2 == 0) {
    alert(`Число ${number} четное`);
  } else {
    alert(`Число ${number} не четное`);
  }
} else {
  alert("Это не число ебень");
}

// exercise 2
let age = +prompt("Введи свой возраст");
const prise = 1000;
switch (true) {
  case isNaN(age):
    alert("Это не цифра тупой");
    break;
  case age < 0:
    alert("Ты еще не родился?");
    break;
  case age < 18:
    discountText = 10;
    discount = 0.9;
    total = prise * discount;
    alert(`Скидка ${discountText}% и цена составит ${total}`);
    break;
  case age > 18 && age <= 65:
    discountText = 20;
    discount = 0.8;
    total = prise * discount;
    alert(`Скидка ${discountText}% и цена составит ${total}`);
    break;
  case age > 65:
    discountText = 30;
    discount = 0.7;
    total = prise * discount;
    alert(`Скидка ${discountText}% и цена составит ${total}`);
    break;
  default:
    alert("Что-то пошло не так");
}

// exercise 3
const role = prompt("Введи username");
const password = prompt("Введи пароль");

const ADMIN = "admin";
const USER = "user";
const PASSWORD = "123456";

switch (true) {
  case (role === ADMIN || role === USER) && password === PASSWORD:
    console.log("Есть права");
    break;
  default:
    console.log("У тебя нет прав");
}

// exercise 4
const weight = +prompt("Введите вес посылки");
const type = prompt("Выберите тип доставки 'Стандарт' 'Экспресс' 'Премиум'");

switch (true) {
  case isNaN(weight) || weight <= 0:
    alert("Введи правильный вес Даун");
    break;
  case !(type === "стандарт" || type === "экспресс" || type === "премиум"):
    alert("Неправильный тип посылки");
    break;
}

let prise2 = 0;

if (weight < 1) {
  prise2 = 5;
} else if (weight > 1 && weight <= 5) {
  prise2 = 10;
} else if (weight > 5) {
  prise2 = 15;
} else {
  alert("Все пошло по пизде");
}

let total2 = 0;

switch (true) {
  case type === "стандарт":
    total2 = prise2 * 1;
    alert(`Итоговая стоимость ${total2}баксов`);
    break;
  case type === "экспресс":
    total2 = prise2 * 1.5;
    alert(`Итоговая стоимость ${total2}баксов`);
    break;
  case type === "премиум":
    total = prise2 * 2;
    alert(`Итоговая стоимость ${total2}баксов`);
    break;
  default:
    alert("fuck you");
}
