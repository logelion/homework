// exercise 1 and 2
const person = {
  firstName: "Timur",
  age: 16,
  hobby: "degradation",
};

const isEmpty = (person) => {
  if ("lastName" in person) {
    console.log(false);
  } else {
    console.log(true);
  }
};

isEmpty(person);

console.log(person.firstName + "\n", person.age + "\n", person.hobby);

// exercise 3
const task = {
  title: "Стать геем",
  description: "Начать любить мужчин",
  isCompleted: false,
};

const cloneAndModify = (object, modifications) => {
  const newObject = { ...object, ...modifications };

  for (let key in newObject) {
    console.log(`${key}: ${newObject[key]}`);
  }

  return newObject;
};

const myModifications = {
  isCompleted: true,
  priority: "High",
};

const resultTask = cloneAndModify(task, myModifications);

// exercise 4

// const callAllMethods = (obj) => {
//   if (typeof obj === "function") {
//     for (let key in obj) {
//       console.log(`${key}: ${obj[key]}`);
//     }
//   }

//   return object4;
// };

// const resultTask = callAllMethods(myObject);

const myObject = {
  method1() {
    console.log("this method 1");
  },

  method2() {
    console.log("this method 2");
  },

  property: "this not method",
};

const callAllMethods = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "function") {
      obj[key]();
    }
  }
};

callAllMethods(myObject);
