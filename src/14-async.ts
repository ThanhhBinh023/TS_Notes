const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fetchUser(): Promise<{ name: string }> {
  await delay(100);
  return { name: "Nam" };
}

async function fetchCourses(): Promise<string[]> {
  await delay(100);
  return ["TypeScript", "Node.js"];
}

// Iterator tự viết: next() trả về Promise có value và done.
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

// Generator là cách viết gọn hơn để tạo chuỗi giá trị bất đồng bộ.
async function* generateNumbers(max: number): AsyncGenerator<number, void, unknown> {
  for (let i = 1; i <= max; i++) {
    await delay(100);
    yield i;
  }
}

async function main(): Promise<void> {
  // Chờ lần lượt: tổng thời gian khoảng 200ms.
  console.time("tuần tự");
  await fetchUser();
  await fetchCourses();
  console.timeEnd("tuần tự");

  // Hai tác vụ độc lập chạy cùng lúc: khoảng 100ms.
  console.time("song song");
  const [user, courses] = await Promise.all([fetchUser(), fetchCourses()]);
  console.timeEnd("song song");
  console.log(user, courses);

  for await (const number of counter) {
    console.log("Iterator:", number);
  }

  for await (const number of generateNumbers(3)) {
    console.log("Generator:", number);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
