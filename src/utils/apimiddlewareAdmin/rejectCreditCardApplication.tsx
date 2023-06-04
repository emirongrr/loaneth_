export default async function (token,applicationId) {
    const headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    };
    const body = {
      applicationId
    }
    const response = await fetch('/api/admin/rejectCreditCardApplication', {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify(body)
    });
  
    if (response.ok) {
      const data = await response.json();
      return { success: true, histry:data?.history };
    } else {
      const data = await response.json();
      return { success: false, message: data?.message };
    }
  }
  