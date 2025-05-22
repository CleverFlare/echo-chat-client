import { dummyMessagesData } from "@/constants/dummy-messages-data";
import { sleep } from "@/lib/sleep";

export async function getMessages(chatId: string) {
  await sleep(2000);

  return dummyMessagesData[chatId] ?? {};
}
