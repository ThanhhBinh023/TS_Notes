// as chỉ báo kiểu cho TS, không chuyển đổi dữ liệu khi chạy.
const raw: unknown = "123";
const text = raw as string;
const number = Number(text); // Đây mới là chuyển sang number.
console.log(typeof text, typeof number);

type User = { name: string };

// Type guard: kiểm tra dữ liệu thật rồi thu hẹp kiểu.
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof (value as any).name === "string"
  );
}

const payload: unknown = JSON.parse('{"name":"Nam"}');
if (isUser(payload)) {
  console.log(payload.name.toUpperCase());
}

class Dog {
  bark(): void {
    console.log("Gâu");
  }
}

const pet: unknown = new Dog();
if (pet instanceof Dog) {
  pet.bark();
}

// Assertion function ném lỗi nếu sai; sau khi gọi, TS hiểu value là string.
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Giá trị phải là chuỗi");
  }
}

const title: unknown = "TypeScript";
assertString(title);
console.log(title.toUpperCase());
