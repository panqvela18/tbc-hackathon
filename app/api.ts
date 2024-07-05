export async function createBankAcc(iBanNumber: string, token: string) {
    const response = await fetch("https://localhost:44324/api/iban/addIban", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ iBanNumber })
    });
  
    if (!response.ok) {
      throw new Error(`Failed to add bank account: ${response.statusText}`);
    }
  
    return await response.json();
  }
  