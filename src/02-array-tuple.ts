const scores: number[] = [7, 8, 9];
const names: Array<string> = ["Nam", "An"]; // Cách viết khác của string[].

scores.push(10);
// scores.push("10"); // Lỗi vì mảng chỉ nhận number.

const passedScores = scores.filter((score) => score >= 8);
console.log(names, passedScores);

// Tuple quy định kiểu ở từng vị trí.
const student: [string, number] = ["Nam", 21];
const [name, age] = student;
console.log(name, age);

// readonly không cho sửa qua biến này.
const point: readonly [number, number] = [10, 20];
// point[0] = 30; // Lỗi.
console.log(point);

// Phần tử có thể không tồn tại, nên kiểm tra trước khi dùng.
const firstScore = scores[0];
if (firstScore !== undefined) {
  console.log(firstScore.toFixed(1));
}
