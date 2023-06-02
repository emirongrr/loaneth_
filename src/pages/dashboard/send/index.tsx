import React, { useContext, useState } from 'react';
import { UserContext } from 'contexts';

const SendMoneyPage: React.FC = () => {
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const sampleAccounts = [
    {
      id: 11,
      accountNumber: '1234567890',
      accountType: 'Savings',
      accountCurrency: 'USD',
      balance: 5000,
      loan: 0,
      iban: 'TR330006100519786457841326',
    },
    {
      id: 12,
      accountNumber: '0987654321',
      accountType: 'Checking',
      accountCurrency: 'TL',
      balance: 10000,
      loan: 0,
      iban: 'TR660006100519786457842135',
    },
    // Diğer örnek hesaplar buraya eklenebilir
  ];

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(event.target.value);
  };

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/transaction/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderAccount: selectedAccount,
          recipientIban: recipient,
          amount: amount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Para gönderme işlemi gerçekleştirildi:', data);
      } else {
        console.error('Para gönderme işlemi başarısız:', response.status);
      }
    } catch (error) {
      console.error('Para gönderme işlemi başarısız:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Para Gönderme</h1>
      <form onSubmit={handleSubmit} className="w-96">
        <div className="mb-4">
          <label
            htmlFor="account"
            className="block text-sm font-medium text-gray-700"
          >
            Hesap Seçin
          </label>
          <select
            id="account"
            name="account"
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedAccount}
            onChange={handleAccountChange}
            required
          >
            <option value="">Hesap Seçin</option>
            {sampleAccounts.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.accountNumber} ({account.balance}{' '}
                {account.accountCurrency})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-700"
          >
            Alıcı
          </label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={recipient}
            onChange={handleRecipientChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Tutar
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default SendMoneyPage;
