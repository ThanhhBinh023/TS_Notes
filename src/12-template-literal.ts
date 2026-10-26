type Version = "v1" | "v2";
type Endpoint = "users" | "courses";
type ApiPath = `/${Version}/${Endpoint}`;

const path: ApiPath = "/v1/users";
// const wrongPath: ApiPath = "/v3/users"; // Lỗi.
console.log(path);

// Hai union sẽ được ghép thành mọi tổ hợp.
type Status = 200 | 404;
type Message = "Success" | "Not Found";
type ResponseText = `${Status} ${Message}`;

const mixed: ResponseText = "200 Not Found"; // Vẫn hợp lệ với kiểu này.
console.log(mixed);

// Muốn ghép đúng từng cặp thì dùng một mapping.
type Messages = {
  200: "Success";
  404: "Not Found";
};

type PairedResponse = {
  [K in keyof Messages]: `${K} ${Messages[K]}`;
}[keyof Messages];

const response: PairedResponse = "200 Success";
// const wrongResponse: PairedResponse = "200 Not Found"; // Lỗi.
console.log(response);

// infer trích ra một phần của kiểu chuỗi.
type GetVersion<T> = T extends `/${infer V}/${string}` ? V : never;
const version: GetVersion<"/v1/users"> = "v1";
console.log(version);
