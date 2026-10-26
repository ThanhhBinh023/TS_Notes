enum TaskStatus {
  Todo = "todo",
  Doing = "doing",
  Done = "done",
}

const task = { title: "Học TypeScript", status: TaskStatus.Doing };
console.log(task);

// Literal type chỉ nhận những giá trị đã liệt kê.
type Role = "user" | "admin";
const role: Role = "user";
// const wrongRole: Role = "guest"; // Lỗi.
console.log(role);

// Viết từng cặp để status và message luôn đi với nhau.
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
// handleResponse({ status: 200, message: "Not Found" }); // Lỗi: sai cặp.
