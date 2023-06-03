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
  Grid,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuItemBankAccount from 'components/MakeTransaction/MenuItemBankAccount';
import makeTransaction from 'utils/apimiddleware/makeTransaction';
import { createToken } from 'libs';
import Navbar from 'components/Navbar';

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
    <>
      <Navbar />
      <div className="min-h-screen dark:bg-slate-900">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            className="mt-32"
            variant="h4"
            component="h1"
            gutterBottom
          >
            {t('SendMoneyPage.title')}
          </Typography>
          <form
            className="mt-20 shadow-3xl rounded-[12px]"
            onSubmit={handleSubmit}
            style={{ width: '24rem' }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="selectAccount">
                    {t('SenderAccount')}
                  </InputLabel>
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
                          />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="recipient"
                  name="recipient"
                  label={t('SendMoneyPage.recipient')}
                  variant="filled"
                  fullWidth
                  value={recipient}
                  onChange={handleRecipientChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="amount"
                  name="amount"
                  label={t('SendMoneyPage.amount')}
                  variant="filled"
                  fullWidth
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="bg-slate-800"
                  type="submit"
                  disabled={isSubmitDisabled}
                  variant="contained"
                  fullWidth
                >
                  {t('SendMoneyPage.sendButton')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </>
  );
};
export default SendMoneyPage;
