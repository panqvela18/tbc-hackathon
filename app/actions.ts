"use server";

import { revalidatePath } from "next/cache";

export async function addBankAccountAction(iBanNumber: string, token: string) {
  revalidatePath("/profile");
  await fetch("https://localhost:44324/api/iban/addIban", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ iBanNumber }),
  });
}
