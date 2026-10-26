// Ghi kiểu trực tiếp: explicit type.
let studentName: string = "Nam";
let age: number = 21;
let isLearning: boolean = true;

// Không ghi kiểu thì TS suy luận từ giá trị ban đầu.
let course = "TypeScript"; // string
course = "Node.js";
// course = 123; // Lỗi: course là string.

let phone: string | null = null;
phone = "0901234567";

let address: string | undefined;
console.log(studentName, age, isLearning, course, phone, address);

// any cho phép gọi cả phương thức không tồn tại, dễ lỗi lúc chạy.
let looseValue: any = 10;
looseValue = "hello";

// unknown nhận mọi giá trị nhưng cần kiểm tra trước khi dùng.
let input: unknown = "  TypeScript  ";
if (typeof input === "string") {
  console.log(input.trim());
}
