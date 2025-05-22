import { sleep } from "@/lib/sleep";

export async function getProfile() {
  await sleep(2000);

  return {
    id: "1",
    firstName: "Muhammad",
    lastName: "Maher",
    username: "flare",
    avatarUrl:
      "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
  };
}
