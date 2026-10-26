# 📘 Ghi chú TypeScript

## 🚀 Cách chạy

Cần cài **Node.js** và **npm** trước.

```bash
npm install      # Cài dependencies (typescript, @types/node)
npm run check    # Kiểm tra kiểu, không sinh file output
npm run build    # Biên dịch TypeScript → dist/
node dist/05-enum-literal.js   # Chạy file bất kỳ
```

### Cấu hình dự án (`tsconfig.json`)

| Tùy chọn | Giá trị | Ý nghĩa |
|---|---|---|
| `target` | `ES2022` | Compile ra ES2022 |
| `module` | `NodeNext` | Dùng ESM module kiểu Node |
| `rootDir` | `src` | Thư mục nguồn |
| `outDir` | `dist` | Thư mục output |
| `strict` | `true` | Bật toàn bộ strict checks |
| `noUncheckedIndexedAccess` | `true` | Truy cập mảng trả `T \| undefined` |

---

## 📚 Mục lục

1. [Kiểu dữ liệu cơ bản](#1-kiểu-dữ-liệu-cơ-bản--khai-báo--suy-luận-kiểu)
2. [Array và Tuple](#2-array-và-tuple)
3. [Object và Interface](#3-object-và-interface)
4. [Type Alias, Union và Intersection](#4-type-alias-union-và-intersection)
5. [Enum và Literal Type](#5-enum-và-literal-type)
6. [Functions](#6-functions)
7. [Casting, Unknown, Type Guard và Assertion](#7-casting-unknown-type-guard-và-assertion)
8. [Class và Kế thừa](#8-class-và-kế-thừa)
9. [Generics](#9-generics)
10. [Utility Types](#10-utility-types)
11. [Mapped Types](#11-mapped-types)
12. [Template Literal Types](#12-template-literal-types)
13. [Symbol](#13-symbol)
14. [Promise, Async/Await, Async Iterator và Generator](#14-promise-asyncawait-async-iterator-và-generator)

---

## 1. Kiểu dữ liệu cơ bản — Khai báo & Suy luận kiểu

> 📄 [`src/01-types.ts`](src/01-types.ts)

### Explicit type (khai báo tường minh)

```typescript
let studentName: string = "Nam";
let age: number = 21;
let isLearning: boolean = true;
```

### Type inference (suy luận từ giá trị ban đầu)

```typescript
let course = "TypeScript"; // TypeScript suy ra: string
course = "Node.js";        // ✅ OK
// course = 123;           // ❌ Lỗi: course là string
```

### `null` và `undefined`

```typescript
let phone: string | null = null;
phone = "0901234567";

let address: string | undefined; // chưa gán → undefined
```

### `any` vs `unknown`

| | `any` | `unknown` |
|---|---|---|
| Nhận mọi giá trị | T | T |
| Bỏ qua kiểm tra kiểu | T | F |
| Cần kiểm tra trước khi dùng | T | F |

```typescript
let looseValue: any = 10;
looseValue = "hello"; // Không lỗi, nhưng dễ sinh bug lúc chạy

let input: unknown = "  TypeScript  ";
if (typeof input === "string") {
  console.log(input.trim()); //Chỉ dùng sau khi kiểm tra
}
```

---

## 2. Array và Tuple

> 📄 [`src/02-array-tuple.ts`](src/02-array-tuple.ts)

### Array

```typescript
const scores: number[] = [7, 8, 9];
const names: Array<string> = ["Nam", "An"]; // Cách viết tương đương

scores.push(10);
// scores.push("10"); // Lỗi: chỉ nhận number

const passedScores = scores.filter((score) => score >= 8);
```

### Tuple — quy định kiểu theo vị trí

```typescript
const student: [string, number] = ["Nam", 21];
const [name, age] = student; // Destructuring vẫn giữ đúng kiểu
```

### `readonly` Tuple

```typescript
const point: readonly [number, number] = [10, 20];
// point[0] = 30; // ❌ Lỗi: không được sửa
```

### Truy cập mảng an toàn (`noUncheckedIndexedAccess`)

```typescript
const firstScore = scores[0]; // kiểu: number | undefined
if (firstScore !== undefined) {
  console.log(firstScore.toFixed(1)); //Chỉ gọi sau khi kiểm tra
}
```

---

## 3. Object và Interface

> 📄 [`src/03-object-interface.ts`](src/03-object-interface.ts)

### Object type inline

```typescript
const course: { name: string; lessons: number } = {
  name: "TypeScript",
  lessons: 12,
};
```

### Interface

```typescript
interface Student {
  readonly id: number;  // Không thể gán lại sau khi tạo
  name: string;
  email?: string;       // Optional — có thể bỏ qua khi tạo
}

const student: Student = { id: 1, name: "Nam" };
student.name = "An"; 
// student.id = 2;     //  Lỗi: id là readonly
```

### Kế thừa interface (`extends`)

```typescript
interface Intern extends Student {
  company: string;
}

const intern: Intern = { id: 2, name: "Linh", company: "ABC" };
```

### Declaration merging — gộp hai interface cùng tên

```typescript
interface Profile { name: string; }
interface Profile { age: number; }

// TypeScript tự gộp lại:
const profile: Profile = { name: "Nam", age: 21 };
```

---

## 4. Type Alias, Union và Intersection

> 📄 [`src/04-alias-union-intersection.ts`](src/04-alias-union-intersection.ts)

### Type Alias

```typescript
type UserId = string | number;
type User = { id: UserId; name: string };

const user: User = { id: 1, name: "Nam" };
```

### Union (`|`) — một trong các kiểu

```typescript
function printId(id: UserId): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TS biết id là string tại đây
  } else {
    console.log(id.toFixed(0));   // TS biết id là number
  }
}
```

### Intersection (`&`) — kết hợp tất cả yêu cầu

```typescript
type Employee = { employeeId: number };
type Contact  = { email: string };
type Staff    = Employee & Contact;   // Phải có cả hai

const staff: Staff = { employeeId: 10, email: "nam@example.com" };
```

### So sánh `type` vs `interface`

| | `type` | `interface` |
|---|---|---|
| Alias cho union/primitive | ✅ | ❌ |
| Dùng cho object | ✅ | ✅ |
| Declaration merging | ❌ | ✅ |
| `extends` | qua `&` | qua `extends` |

---

## 5. Enum và Literal Type

> 📄 [`src/05-enum-literal.ts`](src/05-enum-literal.ts)

### String Enum

```typescript
enum TaskStatus {
  Todo  = "todo",
  Doing = "doing",
  Done  = "done",
}

const task = { title: "Học TypeScript", status: TaskStatus.Doing };
```

### Literal Type — chỉ nhận giá trị liệt kê

```typescript
type Role = "user" | "admin";
const role: Role = "user";
// const wrongRole: Role = "guest"; //Lỗi
```

### Discriminated Union (union phân biệt)

Ghép từng cặp để `status` và `message` luôn nhất quán:

```typescript
type HttpResponse =
  | { status: 200; message: "Success" }
  | { status: 201; message: "Created" }
  | { status: 404; message: "Not Found" };

function handleResponse(response: HttpResponse): void {
  if (response.status === 404) {
    console.log("Lỗi:", response.message);
  } else {
    console.log(response.status, response.message);
  }
}

handleResponse({ status: 200, message: "Success" });
// handleResponse({ status: 200, message: "Not Found" }); // Sai cặp
```

---

## 6. Functions

> 📄 [`src/06-functions.ts`](src/06-functions.ts)

### Khai báo cơ bản & kiểu trả về

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### Default parameter

```typescript
function greet(name: string = "bạn"): string {
  return `Chào ${name}`;
}
greet();        // "Chào bạn"
greet("Nam");   // "Chào Nam"
```

### Optional parameter (`?`)

```typescript
function introduce(name: string, age?: number): string {
  return age === undefined ? name : `${name}, ${age} tuổi`;
}
```

### Rest parameter (`...`)

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3); // 6
```

### Function type alias

```typescript
type Calculate = (a: number, b: number) => number;
const multiply: Calculate = (a, b) => a * b;
```

### `void` — hàm không trả về giá trị để sử dụng

```typescript
function printResult(result: number): void {
  console.log(result);
}
```

---

## 7. Casting, Unknown, Type Guard và Assertion

> 📄 [`src/07-casting-narrowing.ts`](src/07-casting-narrowing.ts)

### `as` — chỉ báo kiểu, không đổi dữ liệu thật

```typescript
const raw: unknown = "123";
const text   = raw as string;  // Báo TS rằng đây là string
const number = Number(text);   // Mới thực sự chuyển sang number
```

### Type Guard — kiểm tra tự viết

```typescript
type User = { name: string };

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
  console.log(payload.name.toUpperCase()); //An toàn
}
```

### `instanceof` — thu hẹp kiểu cho class

```typescript
class Dog {
  bark(): void { console.log("Gâu"); }
}

const pet: unknown = new Dog();
if (pet instanceof Dog) {
  pet.bark();
}
```

### Assertion function — ném lỗi nếu sai kiểu

```typescript
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Giá trị phải là chuỗi");
  }
}

const title: unknown = "TypeScript";
assertString(title);
console.log(title.toUpperCase()); // TS biết title là string sau lời gọi này
```

---

## 8. Class và Kế thừa

> 📄 [`src/08-class.ts`](src/08-class.ts)

### Access modifiers

| Modifier | Trong class | Lớp con | Bên ngoài |
|---|---|---|---|
| `public` | T | T | T |
| `protected` | T | T | F |
| `private` | T | F | F |
| `readonly` | Không gán lại sau khởi tạo | | |

### Class implements Interface

```typescript
interface CanIntroduce {
  introduce(): string;
}

class Person implements CanIntroduce {
  constructor(
    public readonly id: number,
    public name: string,
    protected age: number,
  ) {}

  introduce(): string {
    return `${this.name}, ${this.age} tuổi`;
  }
}
```

### Kế thừa (`extends`) và override

```typescript
class Student extends Person {
  private scores: number[] = [];

  addScore(score: number): void {
    this.scores.push(score);
  }

  get average(): number {
    if (this.scores.length === 0) return 0;
    return this.scores.reduce((s, v) => s + v, 0) / this.scores.length;
  }

  override introduce(): string {
    return `Sinh viên ${super.introduce()}`;
  }
}

const student = new Student(1, "Nam", 21);
student.addScore(8);
student.addScore(9);
// student.scores.push(10); //Lỗi: scores là private
console.log(student.introduce(), student.average); // "Sinh viên Nam, 21 tuổi"  8.5
```

---

## 9. Generics

> 📄 [`src/09-generics.ts`](src/09-generics.ts)

### Generic function — dùng lại code, giữ đúng kiểu

```typescript
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const score = first([8, 9, 10]);    // number | undefined
const name  = first(["Nam", "An"]); // string | undefined
```

### Generic class

```typescript
class Box<T> {
  constructor(private value: T) {}
  getValue(): T { return this.value; }
  setValue(value: T): void { this.value = value; }
}

const box = new Box<number>(10);
box.setValue(20);
// box.setValue("20"); //Lỗi: Box<number> chỉ nhận number
```

### Generic với ràng buộc (`extends`)

```typescript
function getName<T extends { name: string }>(item: T): string {
  return item.name;
}

getName({ name: "Nam", age: 21 }); //— object phải có thuộc tính name
```

---

## 10. Utility Types

> 📄 [`src/10-utility-types.ts`](src/10-utility-types.ts)

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}
```

| Utility | Kết quả | Dùng khi |
|---|---|---|
| `Partial<User>` | Mọi thuộc tính optional | Cập nhật một phần |
| `Required<User>` | Mọi thuộc tính bắt buộc | Cần đủ trường, kể cả optional |
| `Pick<User, "id" \| "name">` | Chỉ giữ các key được chọn | Projection |
| `Omit<User, "id">` | Loại bỏ key | Tạo DTO bỏ id |
| `Readonly<User>` | Không được gán lại | Hằng số, config |
| `Record<K, V>` | Object với tập key cố định | Map thuần |
| `ReturnType<typeof fn>` | Kiểu trả về của hàm | Tái sử dụng kiểu |
| `Parameters<typeof fn>` | Tuple các tham số của hàm | Gọi động |

```typescript
const update: Partial<User>        = { name: "An" };
const preview: Pick<User, "id" | "name"> = { id: 1, name: "Nam" };
const scores: Record<"math" | "english", number> = { math: 8, english: 9 };

function createUser(name: string, id: number): User { return { id, name }; }

type CreatedUser    = ReturnType<typeof createUser>;   // User
type CreateUserArgs = Parameters<typeof createUser>;   // [string, number]

const args: CreateUserArgs = ["Nam", 3];
const user: CreatedUser = createUser(...args);
```

---

## 11. Mapped Types

> 📄 [`src/11-mapped-types.ts`](src/11-mapped-types.ts)

Duyệt qua từng key của một type để tạo type mới.

### Cú pháp cơ bản

```typescript
// keyof T lấy union các key: "name" | "age"
// T[K]   lấy kiểu của thuộc tính K
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type ReadonlyFields<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Ví dụ

```typescript
interface Student { name: string; age: number; }

const update:  Optional<Student>      = { age: 22 };
const student: ReadonlyFields<Student> = { name: "Nam", age: 21 };
```

### Đổi kiểu cho thuộc tính cụ thể

```typescript
type FormFields = {
  [K in keyof Student]: K extends "age" ? string : Student[K];
  // age → string, name → string (giữ nguyên kiểu gốc)
};

const form: FormFields = { name: "Nam", age: "21" }; // age là string
```

---

## 12. Template Literal Types

> 📄 [`src/12-template-literal.ts`](src/12-template-literal.ts)

Xây kiểu chuỗi bằng cách ghép các union lại với nhau.

### Ghép đơn giản

```typescript
type Version  = "v1" | "v2";
type Endpoint = "users" | "courses";
type ApiPath  = `/${Version}/${Endpoint}`;
// Kết quả: "/v1/users" | "/v1/courses" | "/v2/users" | "/v2/courses"

const path: ApiPath = "/v1/users"; // True
// const wrongPath: ApiPath = "/v3/users"; // lỗi
```

### Hai union ghép tạo mọi tổ hợp

```typescript
type Status      = 200 | 404;
type Message     = "Success" | "Not Found";
type ResponseText = `${Status} ${Message}`;
// "200 Success" | "200 Not Found" | "404 Success" | "404 Not Found"
```

### Ghép đúng từng cặp — dùng mapping

```typescript
type Messages = { 200: "Success"; 404: "Not Found" };

type PairedResponse = {
  [K in keyof Messages]: `${K} ${Messages[K]}`;
}[keyof Messages];
// "200 Success" | "404 Not Found" — chỉ những cặp hợp lệ

const response: PairedResponse = "200 Success";
// const wrong: PairedResponse = "200 Not Found"; // Sai
```

### `infer` — trích ra một phần kiểu chuỗi

```typescript
type GetVersion<T> = T extends `/${infer V}/${string}` ? V : never;
const version: GetVersion<"/v1/users"> = "v1"; // Kiểu là "v1"
```

---

## 13. Symbol

> 📄 [`src/13-symbol.ts`](src/13-symbol.ts)

### Symbol luôn là unique

```typescript
const firstId  = Symbol("id");
const secondId = Symbol("id");
console.log(Object.is(firstId, secondId)); // false — dù cùng mô tả
```

### `unique symbol` — dùng làm khóa interface

```typescript
const internalId: unique symbol = Symbol("internalId");

interface User {
  name: string;
  [internalId]: number; // Khóa symbol private
}

const user: User = { name: "Nam", [internalId]: 1 };
console.log(user[internalId]); // 1
```

### Symbol không xuất hiện trong serialization thông thường

```typescript
console.log(Object.keys(user));              // ["name"]
console.log(JSON.stringify(user));           // {"name":"Nam"}
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(internalId)]
```

> **Dùng khi:** muốn đính kèm metadata ẩn vào object mà không bị lộ qua `JSON.stringify` hay `Object.keys`.

---

## 14. Promise, Async/Await, Async Iterator và Generator

> 📄 [`src/14-async.ts`](src/14-async.ts)

### Hàm async — trả về `Promise<T>`

```typescript
async function fetchUser(): Promise<{ name: string }> {
  await delay(100);
  return { name: "Nam" };
}
```

### Tuần tự vs Song song

```typescript
// Tuần tự (~200ms): chờ từng cái
await fetchUser();
await fetchCourses();

// Song song (~100ms): hai tác vụ độc lập chạy cùng lúc
const [user, courses] = await Promise.all([fetchUser(), fetchCourses()]);
```

### Async Iterator (tự viết)

```typescript
const counter: AsyncIterable<number> = {
  [Symbol.asyncIterator]() {
    let current = 1;
    return {
      async next(): Promise<IteratorResult<number>> {
        if (current > 3) return { value: undefined, done: true };
        await delay(100);
        return { value: current++, done: false };
      },
    };
  },
};

for await (const number of counter) {
  console.log("Iterator:", number); // 1, 2, 3
}
```

### Async Generator — cách viết gọn hơn

```typescript
async function* generateNumbers(max: number): AsyncGenerator<number, void, unknown> {
  for (let i = 1; i <= max; i++) {
    await delay(100);
    yield i;
  }
}

for await (const number of generateNumbers(3)) {
  console.log("Generator:", number); // 1, 2, 3
}
```

### Xử lý lỗi

```typescript
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## ⚠️ Mấy chỗ dễ nhầm

| Vấn đề | Ghi nhớ |
|---|---|
| TypeScript chỉ kiểm tra lúc **biên dịch** | Dữ liệu từ API vẫn cần kiểm tra lúc **chạy** (dùng type guard) |
| `as` không đổi giá trị thật | Muốn đổi chuỗi → số dùng `Number()`, không dùng `as` |
| `any` vs `unknown` | `unknown` buộc phải kiểm tra trước khi dùng; `any` bỏ qua hoàn toàn |
| `type` vs `interface` | `type` dùng cho union/primitive/object; `interface` dùng cho object và hỗ trợ declaration merging |
| Template literal ghép hai union | Tạo **mọi tổ hợp**, không tự ghép đúng từng cặp — dùng mapping nếu cần |

---

## 📖 Tham khảo

- Repo gốc tham khảo khi học: [NodeJS-Course — TypeScript](https://github.com/itsdoanguen/NodeJS-Course/tree/main/Typescript)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
