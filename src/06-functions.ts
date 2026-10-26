function add(a: number, b: number): number {
  return a + b;
}

// Tham số có giá trị mặc định thì có thể bỏ qua khi gọi.
function greet(name: string = "bạn"): string {
  return `Chào ${name}`;
}

function introduce(name: string, age?: number): string {
  return age === undefined ? name : `${name}, ${age} tuổi`;
}

// Rest parameter gom các tham số còn lại thành mảng.
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}

type Calculate = (a: number, b: number) => number;
const multiply: Calculate = (a, b) => a * b;

// void: hàm không trả về giá trị để sử dụng.
function printResult(result: number): void {
  console.log(result);
}

printResult(add(2, 3));
printResult(sum(1, 2, 3));
printResult(multiply(4, 5));
console.log(greet(), introduce("Nam", 21));
