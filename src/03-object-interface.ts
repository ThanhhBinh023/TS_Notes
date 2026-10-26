const course: { name: string; lessons: number } = {
  name: "TypeScript",
  lessons: 12,
};

interface Student {
  readonly id: number;
  name: string;
  email?: string; // Có thể không truyền email.
}

const student: Student = { id: 1, name: "Nam" };
student.name = "An";
// student.id = 2; // Lỗi vì id là readonly.

interface Intern extends Student {
  company: string;
}

const intern: Intern = { id: 2, name: "Linh", company: "ABC" };
console.log(course, student, intern);

// Hai interface cùng tên trong cùng phạm vi sẽ được gộp lại.
interface Profile {
  name: string;
}

interface Profile {
  age: number;
}

const profile: Profile = { name: "Nam", age: 21 };
console.log(profile);
