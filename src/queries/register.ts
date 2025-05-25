import { axiosInstance } from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};
export async function register(data: RegisterData) {
  try {
    const response = await axiosInstance.post<{ token: string }>(
      "/register",
      data,
    );

    localStorage.setItem("OutSiteJWT", response.data.token);

    return response.data.token;
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>).response?.data.message,
      );

    throw err;
  }
}
