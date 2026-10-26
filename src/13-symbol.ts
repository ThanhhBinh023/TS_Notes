// Mỗi lần gọi Symbol() tạo một giá trị khác, dù cùng mô tả.
const firstId = Symbol("id");
const secondId = Symbol("id");
console.log(Object.is(firstId, secondId)); // false

const internalId: unique symbol = Symbol("internalId");

interface User {
  name: string;
  [internalId]: number;
}

const user: User = { name: "Nam", [internalId]: 1 };
console.log(user[internalId]);

// Khóa symbol không xuất hiện trong Object.keys() hay JSON.stringify().
console.log(Object.keys(user)); // ["name"]
console.log(JSON.stringify(user)); // {"name":"Nam"}
console.log(Object.getOwnPropertySymbols(user)); // Vẫn lấy được khóa symbol.
