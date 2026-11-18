// exercise 1
const price = +prompt("Введи цену");
const percent = +prompt("Введи процент скидки(натурально число от 0 до 100) ");
const tax = +prompt("Введи налоговую ставку(натурально число от 0 до 100) ");
const calculateFinalPrice = (price, percent, tax) => {
  if (
    price < 0 ||
    percent < 0 ||
    tax < 0 ||
    isNaN(price) ||
    isNaN(percent) ||
    isNaN(tax)
  ) {
    alert(`Некорректные числа`);
    return;
  }

  if (percent > 100 || tax > 100) {
    alert("Скидка и налог не могут быть больше 100%");
    return;
  }
  // ФИНАЛЬНАЯ ЦЕНА * ПРОЦЕНТ СКИДКИ * НАЛОГОВУЮ СТАВКУ
  const finalPrice = price * (1 - percent / 100) * (1 + tax / 100);
  return finalPrice;
};

const result = calculateFinalPrice(price, percent, tax);
if (result !== undefined) {
  console.log(`Итоговая цена: ${result}`);
}

// console.log(calculateFinalPrice(1000, 10, 20));
// console.log(calculateFinalPrice(1000, 15, 0));
// console.log(calculateFinalPrice(1000, 15, 21));

// exercise 2

// switch (true) {
//   case (role === ADMIN) && password === PASSWORD:
//     console.log("Есть права");
//     break;
//   default:
//     console.log("У тебя нет прав");
// }

const role = prompt("Введи username");
const password = prompt("Введи пароль");

const ADMIN = "admin";
const PASSWORD = "123456";

const checkAccess = (userRole, userPassword) => {
  if (userRole === ADMIN && userPassword === PASSWORD) {
    return "Есть права";
  } else {
    return "У тебя нет прав";
  }
};
const resultLogin = checkAccess(role, password);
console.log(resultLogin);

// exercise 3
const time = +prompt("Введи время от 0 до 23");
const getTimeOfDay = (time) => {
  if (time >= 0 && time <= 5) {
    return "Ночь";
  } else if (time >= 6 && time <= 11) {
    return "Утро";
  } else if (time >= 12 && time <= 17) {
    return "День";
  } else if (time >= 18 && time <= 23) {
    return "Вечер";
  } else {
    return "Некорректное время";
  }
};

console.log(getTimeOfDay(time));

// exercise 4
const start = +prompt("Введи первое число для проверки четности");
const end = +prompt("Введи второе число для проверки четности");
function findFirstEven(start, end) {
  if (isNaN(start) || isNaN(end)) return "Введите корректные числа";
  if (start > end) return "Некорректный диапазон";

  function firstEven(start) {
    if (start % 2 === 0) {
      return start;
    } else {
      return start + 1;
    }
  }
  const result3 = firstEven(start);

  return result3 <= end ? result3 : "Четных чисел нету";
}

console.log(findFirstEven(start, end));

const findEven = (start, end) => {
  if (start > end) return "Некорректный диапазон";

  if (isNaN(start) || isNaN(end)) return "Некорректные числа";

  let numbers = "";
  for (let i = start; i <= end; i++) {
    if (i % 2 == 0) {
      numbers += i + "\n";
    }
  }

  if (numbers) {
    return numbers;
  } else {
    return "Четных чисел нет";
  }
};

console.log(findEven(1, 10));
