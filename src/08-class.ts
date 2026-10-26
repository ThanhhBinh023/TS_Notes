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

class Student extends Person {
  private scores: number[] = [];

  addScore(score: number): void {
    this.scores.push(score);
  }

  get average(): number {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, score) => sum + score, 0);
    return total / this.scores.length;
  }

  override introduce(): string {
    return `Sinh viên ${super.introduce()}`;
  }
}

// public: truy cập bên ngoài; protected: thêm lớp con; private: trong lớp đó.
const student = new Student(1, "Nam", 21);
student.addScore(8);
student.addScore(9);
// student.scores.push(10); // Lỗi: scores là private.
console.log(student.introduce(), student.average);
