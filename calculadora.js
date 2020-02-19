'use strict'

var params = process.argv.slice(2); // index 2 para ver solo los parametros que le dimos y no la dire del archivo

var num1 = parseFloat(params[0]);
var num2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${num1 + num2}
La resta es: ${num1 - num2}
La multiplicación es: ${num1 * num2}
La división es: ${num1 / num2}
`;

console.log(params);
console.log(num1);
console.log(num2);
console.log(plantilla);
console.log("Hola mundo con nodeJS");
