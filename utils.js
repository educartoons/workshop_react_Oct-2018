function sum(a, b) {
  return x => {
    return x(a + b);
  };
}

function multiply(val) {
  console.log("El valor es: ", val);
}

console.log(sum(5, 10)(multiply));
