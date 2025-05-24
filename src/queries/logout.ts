import { axiosInstance } from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export async function logout() {
  try {
    await axiosInstance.get("/logout");
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>)?.response?.data.message,
      );

    throw err;
  }
}
