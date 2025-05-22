import { sleep } from "@/lib/sleep";

type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};
export async function register(data: RegisterData) {
  if (data.username === "error") {
    throw new Error("Incorrect username or password");
  }
  await sleep(2000);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJmbGFyZSIsImlkIjoiMSIsImlhdCI6MTUxNjIzOTAyMn0.vu53uY6ZiUFovGiLDBFEcVekKjNjCnsRdcVMSPDT_-s";

  return token;
}
