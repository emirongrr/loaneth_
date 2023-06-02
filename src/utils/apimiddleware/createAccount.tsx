import { Types } from 'mongoose';
import createCard from './createCard';

export default async function (
  token,
  accountType,
  currency,
  balance,
  loan,
  doCreateCard
) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const body = {
    accountType,
    currency,
    balance,
    loan,
  };
  const response = await fetch('/api/accounts/createaccount', {
    method: 'POST',
    headers: headersList,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    return { succes: false, smessage: 'Failed to create bank account.' };
  }
  const data = await response.json();
  const insertedAccountID = data?.insertedBankAccountID;
  if (doCreateCard) {
    //create card
    const { success, message } = await createCard(
      token,
      -1,
      'DEBIT',
      'MASTERCARD',
      insertedAccountID
    );
    if (success) {
      return { success: true };
    } else {
      return { success: false, message };
    }
  }
}
