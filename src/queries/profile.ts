import { axiosInstance } from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export async function getProfile() {
  try {
    const response = await axiosInstance.get<{
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      avatarUrl: string | null;
    }>("/profile");

    return response.data;
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>).response?.data.message,
      );

    throw err;
  }
}
