interface User {
  id: number;
  name: string;
  email?: string;
}

// Partial: mọi thuộc tính đều optional. Hợp với dữ liệu cập nhật.
const update: Partial<User> = { name: "An" };

// Required: mọi thuộc tính đều bắt buộc, kể cả email.
const fullUser: Required<User> = {
  id: 1,
  name: "Nam",
  email: "nam@example.com",
};

const preview: Pick<User, "id" | "name"> = { id: 1, name: "Nam" };
const withoutId: Omit<User, "id"> = { name: "Linh" };
const fixedUser: Readonly<User> = { id: 2, name: "An" };
// fixedUser.name = "Nam"; // Lỗi: thuộc tính chỉ đọc.

// Record: quy định tập khóa và kiểu giá trị.
const scores: Record<"math" | "english", number> = { math: 8, english: 9 };

function createUser(name: string, id: number): User {
  return { id, name };
}

type CreatedUser = ReturnType<typeof createUser>;
type CreateUserArgs = Parameters<typeof createUser>;

const args: CreateUserArgs = ["Nam", 3];
const user: CreatedUser = createUser(...args);
console.log(update, fullUser, preview, withoutId, fixedUser, scores, user);
