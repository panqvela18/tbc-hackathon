"use server";
import { revalidatePath } from "next/cache";
import { createBankAcc } from "./api"


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

export async function createAddOrderAction(order:any,token:string){

    await fetch("http://3.76.39.238/api/order/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });
      revalidatePath("/")
}