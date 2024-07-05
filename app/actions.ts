"use server";

import { revalidatePath } from "next/cache";
import { createBankAcc } from "./api";

export async function addBankAccountAction(iBanNumber: string, token: string) {
  revalidatePath("/profile");
   createBankAcc(iBanNumber,token) 
}
