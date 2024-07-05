export async function createBankAcc(iBanNumber:string,token:string) {

    return await fetch("https://localhost:44324/api/iban/addIban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
    }

  })
}