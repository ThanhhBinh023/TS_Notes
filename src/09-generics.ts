// Generic giúp dùng lại code mà vẫn giữ được kiểu cụ thể.
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const score = first([8, 9, 10]); // number | undefined
const name = first(["Nam", "An"]); // string | undefined
console.log(score, name);

class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const box = new Box<number>(10);
box.setValue(20);
// box.setValue("20"); // Lỗi: Box này chứa number.
console.log(box.getValue());

// extends giới hạn T: đối tượng truyền vào phải có name là string.
function getName<T extends { name: string }>(item: T): string {
  return item.name;
}

console.log(getName({ name: "Nam", age: 21 }));
