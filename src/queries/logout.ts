import cookies from "browser-cookies";

export async function logout() {
  cookies.erase("OutSiteJWT");
}
