// exercise 1 and 3
const users = [
  { name: "Alex", age: 24, isAdmin: false },
  { name: "Bob", age: 13, isAdmin: false },
  { name: "John", age: 31, isAdmin: true },
  { name: "Jane", age: 20, isAdmin: false },
];

users.push(
  { name: "Ann", age: 19, isAdmin: false },
  { name: "Jack", age: 43, isAdmin: true },
);

console.log(users);

// exercise 3

// ПРОВЕРИМ НАШУ КОНСКУЮ ЗАЛУПУ

users.push(
  { name: "Papa", age: 91, isAdmin: true },
  { name: "Mama", age: 14, isAdmin: true },
);

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function getUserAverageAge(users) {
  if (users.length === 0) return 0;

  let sum = 0;
  for (let i = 0; i < users.length; i++) {
    sum += users[i].age;
  }
  const middleAge = sum / users.length;
  return middleAge;
}

console.log(getUserAverageAge(users));

function getAllAdmins(usersAdmin) {
  const admins = [];

  for (let i = 0; i < usersAdmin.length; i++) {
    if (usersAdmin[i].isAdmin === true) {
      admins.push(users[i]);
    }
  }

  return admins;
}

console.log(getAllAdmins(users));
// ebat` rabotaet

// exercise 4

const numbers = [1, 42, 52, 12, 14, 12];

function first(arr, n) {
  if (n === undefined) {
    return arr;
    // ВОЗВРАЩАЕТ ВЕСЬ МАССИВ
  }

  if (n === 0) {
    return [];
  }

  if (n > arr.length) {
    console.error(
      `${n} не может быть длиннее массива, то бишь не более: ${arr.length}`,
    );
    return [];
  }

  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(arr[i]);
  }

  return result;
}

// ЕЩЕ ОДНА ПРОВЕРКА ГОВНО КОДА
console.log(first(numbers, 3));
console.log(first(numbers, 1));
console.log(first(numbers, 0));
console.log(first(numbers));
console.log(first(numbers, 100000));
console.log(first(numbers, 6));
