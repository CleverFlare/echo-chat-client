import { sleep } from "@/lib/sleep";
import cookies from "browser-cookies";

type LoginData = {
  username: string;
  password: string;
};

export async function login(data: LoginData) {
  await sleep(2000);

  if (data.username === "error") {
    throw new Error("Incorrect username or password");
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJmbGFyZSIsImlkIjoiMSIsImlhdCI6MTUxNjIzOTAyMn0.vu53uY6ZiUFovGiLDBFEcVekKjNjCnsRdcVMSPDT_-s";

  cookies.set("OutSiteJWT", token);

  return token;
}
