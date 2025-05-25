import { axiosInstance } from "@/lib/axios";
import type { Contact } from "@/store/contacts";
import { AxiosError, isAxiosError } from "axios";

export async function getUserContacts() {
  try {
    const response = await axiosInstance.get("/contacts");

    return response.data;
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>).response?.data.message,
      );

    throw err;
  }
}

export async function addContact(username: string) {
  try {
    const response = await axiosInstance.post<Contact>("/add-contact", {
      username,
    });

    console.log("RESPONSE", response.data);

    return response.data;
  } catch (err) {
    if (isAxiosError(err))
      throw new Error(
        (err as AxiosError<{ message: string }>).response?.data.message,
      );

    throw err;
  }
}
