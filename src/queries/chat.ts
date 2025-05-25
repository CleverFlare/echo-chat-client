import { axiosInstance } from "@/lib/axios";
import { AxiosError, isAxiosError } from "axios";

export async function getMessages(chatId: string) {
  try {
    const response = await axiosInstance.get(`/messages/${chatId}`);

    return response.data;
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>).response?.data.message,
      );

    throw err;
  }
}
