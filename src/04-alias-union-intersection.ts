// Alias: đặt tên cho một kiểu để dùng lại.
type UserId = string | number;
type User = { id: UserId; name: string };

const user: User = { id: 1, name: "Nam" };

// Union (|): giá trị thuộc một trong các kiểu.
function printId(id: UserId): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}

printId(user.id);
printId("sv01");

// Intersection (&): kết hợp các yêu cầu của nhiều kiểu.
type Employee = { employeeId: number };
type Contact = { email: string };
type Staff = Employee & Contact;

const staff: Staff = { employeeId: 10, email: "nam@example.com" };
console.log(staff);
