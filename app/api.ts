export async function createBankAcc(iBanNumber:string, token:string) {
    const response = await fetch('http://3.76.39.238/api/iban/addIban', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ iBanNumber }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add bank account');
    }
  
    return response.json(); // Assuming the API returns JSON
  }