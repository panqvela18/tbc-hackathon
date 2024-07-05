"use server";
import { revalidatePath } from "next/cache";
import { createBankAcc } from "./api";


export async function addBankAccountAction(iBanNumber: string, token: string) {
  try {
    // Ensuring the cache revalidation happens after the API call
    await createBankAcc(iBanNumber, token);
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error in addBankAccountAction:", error);
    throw error; // Re-throw to handle it in the original handler
  }
}