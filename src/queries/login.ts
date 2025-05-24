import { axiosInstance } from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

type LoginData = {
  username: string;
  password: string;
};

export async function login(data: LoginData) {
  try {
    const response = await axiosInstance.post<{ token: string }>(
      "/login",
      data,
    );

    return response.data.token;
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>).response?.data.message,
      );

    throw err;
  }
}
