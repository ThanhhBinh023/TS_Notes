interface Student {
  name: string;
  age: number;
}

// keyof lấy các khóa: "name" | "age".
// T[K] lấy kiểu của thuộc tính K.
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type ReadonlyFields<T> = {
  readonly [K in keyof T]: T[K];
};

const update: Optional<Student> = { age: 22 };
const student: ReadonlyFields<Student> = { name: "Nam", age: 21 };
console.log(update, student);

// Có thể đổi kiểu riêng cho một thuộc tính khi duyệt các khóa.
type FormFields = {
  [K in keyof Student]: K extends "age" ? string : Student[K];
};

const form: FormFields = { name: "Nam", age: "21" };
console.log(form);
