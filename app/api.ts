export async function createBankAcc(iBanNumber: string, token: string) {
    try {
      const response = await fetch("http://3.76.39.238/api/iban/addIban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ iBanNumber })
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get the response text for more details
        throw new Error(`Failed to add bank account: ${response.statusText} - ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in createBankAcc:", error);
      throw error; // Re-throw to handle it in the original handler
    }
  }