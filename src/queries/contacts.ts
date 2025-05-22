import { dummyContactsData } from "@/constants/dummy-contacts-data";
import { sleep } from "@/lib/sleep";

export async function getUserContacts() {
  await sleep(2000);

  return dummyContactsData;
}
