// exercise 1
const number = 20;
for (let i = 1; i <= number; i++) {
  if (i % 4 == 0) {
    continue;
  }
  console.log(i);
}

// exercise 2
const number2 = +prompt("Введите число для факториала, строго БОЛЬШЕ 0");
if (isNaN(number2) || number2 < 0) {
  alert("Введи корректное число");
} else {
  let result2 = 1;

  for (let i = 1; i <= number2; i++) {
    result2 = result2 * i;
  }

  alert(`Факториал числа ${number2} равен: ${result2}`);
}

// exercise 3
let board = "";
for (let line = 1; line <= 8; line++) {
  for (let column = 1; column <= 8; column++) {
    if ((line + column) % 2 === 0) {
      board += "# ";
    } else {
      board += "@ ";
    }
  }
  board += "\n";
}
console.log(board);
