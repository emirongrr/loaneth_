import { useEffect, useState } from 'react';
import Chart from '../Charts';
import { DonutChart } from '@tremor/react';
import AccountModel, { IAccount } from 'models/accountModel';
import { BankAccount, User } from 'libs/types/user';

interface ChartProps {
  currentUser: User;
}

const ChartSection: React.FC<ChartProps> = ({ currentUser }) => {
  const [accountBalances, setAccountBalances] = useState<
    { name: string; sales: number }[]
  >([]);

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        // Assign the bank accounts of the current user to the 'accounts' variable
        const accounts: BankAccount[] = currentUser?.bankAccounts || [];

        // Calculate the total balance for each currency
        const currencyBalances = accounts.reduce(
          (balances: { [currency: string]: number }, account) => {
            if (account.currency && account.balance) {
              balances[account.currency] =
                (balances[account.currency] || 0) + account.balance;
            }
            return balances;
          },
          {}
        );

        // Convert the currency balances into the required format for the pie chart
        const chartData = Object.entries(currencyBalances).map(
          ([currency, balance]) => ({
            name: currency,
            sales: balance,
          })
        );

        // Update the state with the account balances
        setAccountBalances(chartData);
      } catch (error) {
        console.error('Error fetching account balances:', error);
      }
    };

    fetchAccountBalances();
  }, [currentUser]);
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
  return (
    <div className="grid grid-flow-col auto-cols-new gap-[30px] grid-cols-[1fr,300px] items-initial justify-initial">
      <div className="grid gap-[12px] grid-cols-new">
        <div className="grid grid-flow-col auto-cols-new gap-[8px] items-end">
          <div className="block font-graphik text-[24px] text-black dark:text-white leading-28 font-medium tracking-normal ">
            Performance
          </div>
        </div>
        <span>
          <div className="flex shadow-2xl flex-col h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border  border-neutral-300  ">
            <Chart />
          </div>
        </span>
      </div>

      <div className="grid gap-[12px] grid-cols-new1">
        <div className="block font-graphik text-[24px] text-black dark:text-white leading-28 font-medium tracking-normal text-current">
          Assets
        </div>
        <span>
          <div className="flex flex-col shadow-2xl h-[340px] justify-between p-[16px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300">
            <DonutChart
              className="mt-12"
              data={accountBalances}
              category="sales"
              index="name"
              valueFormatter={valueFormatter}
            />
          </div>
        </span>
      </div>
    </div>
  );
};

export default ChartSection;
