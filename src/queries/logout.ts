import { useAuthStore } from "@/store/auth";

export async function logout() {
  useAuthStore.getState().reset();
  localStorage.removeItem("OutSiteJWT");
  // try {
  //   await axiosInstance.get("/logout");
  // } catch (err) {
  //   if (isAxiosError(err))
  //     throw new Error(
  //       (err as AxiosError<{ message: string }>)?.response?.data.message,
  //     );
  //
  //   throw err;
  // }
}
