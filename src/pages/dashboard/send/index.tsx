import React, { useContext, useState } from 'react';
import { UserContext } from 'contexts';
import { BankAccount, emptyAccount } from 'libs/types/user';
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuItemBankAccount from 'components/MakeTransaction/MenuItemBankAccount';
import makeTransaction from 'utils/apimiddleware/makeTransaction';
import { createToken } from 'libs';

const SendMoneyPage: React.FC = () => {
  const { t } = useTranslation('makeTransaction');
  const { isLoading, sessionSet, currentUser }: any = useContext(UserContext);
  const [selectedAccountIBAN, setSelectedAccountIBAN] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const bankAccounts: BankAccount[] = currentUser?.bankAccounts;

  const handleAccountChange = (event) => {
    console.log(event);
    setSelectedAccountIBAN(event.target.value);
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
    setIsSubmitDisabled(true);
    event.preventDefault();
    const token = localStorage.getItem('token');
    const { success, message } = await makeTransaction(
      token,
      selectedAccountIBAN,
      recipient,
      amount,
      'TRANSFER'
    );
    setIsSubmitDisabled(false);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Para Gönderme</h1>
      <form onSubmit={handleSubmit} className="w-96">
        <div className="mb-4">
          <FormControl variant="filled" sx={{ minWidth: 800 }} margin="dense">
            <InputLabel id="selectAccount">{t('SenderAccount')}</InputLabel>
            <Select
              labelId="selectAccount"
              value={selectedAccountIBAN}
              onChange={(e) => handleAccountChange(e)}
            >
              {bankAccounts?.map((account) => {
                return (
                  <MenuItem key={account.iban} value={account.iban}>
                    <MenuItemBankAccount
                      accountNumber={account.accountNumber}
                      iban={account.iban}
                      balance={account.balance}
                      currency={account.currency}
                    ></MenuItemBankAccount>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
          disabled={isSubmitDisabled}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default SendMoneyPage;
