// Function hold in object
const person = {
    name: 'John',
    age: 30,
    greet: function () {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

// splice method to modify array
const fruits = ['Apple', 'Banana', 'Cherry', "Date"];
fruits.splice(1, 2, 'Orange', "cocoa"); // Replace 'Apple' with 'Orange' and add 'cocoa' at index 1


// forEach method to iterate over array with index
fruits.forEach((fruit, index) => {
    console.log(`Fruit at index ${index}: ${fruit}`);
});


// array of objects and using map to extract specific property
const users = [
    { score: 76, name: 'Alice' },
    { score: 46, name: 'Bob' },
    { score: 39, name: 'Charlie' },
    { score: 88, name: 'David' },
    { score: 55, name: 'Eve' }
];

const passStudents = users.filter(user => user.score >= 50).map(user => user.name);

users.forEach(user => {
    if (passStudents.includes(user.name)) {
        user.name = user.name.toUpperCase();
    }
})
console.log(users);