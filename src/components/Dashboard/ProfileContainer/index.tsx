import {
<<<<<<< HEAD
=======
  Box,
>>>>>>> 2319f2bb125694294c24157292e692f202aa842b
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
<<<<<<< HEAD
  Switch,
=======
>>>>>>> 2319f2bb125694294c24157292e692f202aa842b
} from '@chakra-ui/react';
import ConstructReference from 'libs/refconstructor';
import { BankAccount, User } from 'libs/types/user';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LogOut } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'tabler-icons-react';
import FormatCurrency from 'utils/formatters/currencyFormatters';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import TransactionHistory from 'components/Dashboard/PageContainer/TransactionHistory';
import CampaignSlider from '../PageContainer/CampaignSlider';
import PageBody from '../PageContainer';
=======
>>>>>>> 2319f2bb125694294c24157292e692f202aa842b

type ProfileContainerProps = {
  currentUser: User;
};

export const tabConfig = [
  {
    name: 'Portfolio',
    value: 'portfolio',
  },
  {
    name: 'History',
    value: 'history',
  },
];
const ProfileContainer: React.FC<ProfileContainerProps> = ({ currentUser }) => {
  const { t } = useTranslation('dashboard');
  const [tab, setTab] = useState(tabConfig[0].value);
  const router = useRouter();
  const mainBankAccount: BankAccount = currentUser?.bankAccounts[0];
  let totalBalance_TL = 0;
  currentUser.bankAccounts.forEach((account) => {
    totalBalance_TL += account?.balance;
  });

  const copyIBAN = () => {
    console.log(currentUser);
    const mainBankAccountIBAN = mainBankAccount.iban;
    navigator.clipboard.writeText(String(mainBankAccountIBAN));
    alert(String(mainBankAccountIBAN));
    //alert("Kullanıcı adı kopyalandı!");
  };

  const Logout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    router.reload();
  };

  return (
    <>
      <div className="w-full max-w-[960px] shadow-lg shadow-3xl rounded-[12px] mx-auto px-3.5  box-border block mt-4">
        <div className="h-6 w-auto"></div>
        <div className="grid grid-flow-col grid-cols-new gap-0 items-start flex justify-between box-border">
          <div className="grid grid-flow-col grid-cols-new gap-5 items-start justify-start">
            <div className="rounded-2xl w-[104px] h-[104px] relative">
              <img
                className="w-full h-full object-cover object-center block rounded-xl"
                src="/svg/profile.png"
              />
            </div>
            <div className="grid gap-1 grid-cols-new">
              <div className="grid grid-flow-col auto-cols-new gap-1 items-center justify-start h-6 flex gap-2">
                <span className="block font-semibold text-xl leading-6 font-medium text-black dark:text-white tracking-tighter text-current whitespace-nowrap">
                  {' '}
                  {`${currentUser?.firstName} ${currentUser?.lastName}`}
                </span>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        isActive={isOpen}
                        as={Button}
                        rightIcon={
                          <ChevronDown
                            className="dark:text-white text-black"
                            size={14}
                          />
                        }
                      >
                        {isOpen ? ' ' : ' '}
                      </MenuButton>
                      <MenuList className="w-[250px]">
                        <MenuItem
                          className="dark:bg-[#16161a] bg-white text-black dark:text-white border-none outline-none"
                          onClick={copyIBAN}
                        >
                          IBAN KOPYALA
                        </MenuItem>
                        <MenuItem className="dark:bg-[#16161a] bg-white hover:opacity-2 text-black dark:text-white border-none outline-none">
                          QR KOD GÖSTER
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </div>
              <div>
                <div className="grid grid-cols-minmax-auto">
                  <span className="grid grid-flow-col auto-cols-new gap-4 items-center break-words text-black dark:text-white justify-start text-3xl leading-12 ">
                    {mainBankAccount &&
                      FormatCurrency(
                        mainBankAccount.balance,
                        mainBankAccount.currency
                      )}
                  </span>
                  <span
                    className={`block font-graphik text-base leading-5 font-medium tracking-tight ${
                      -3 >= 0 ? 'text-green' : 'text-red-500'
                    }`}
                  >
                    2
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col auto-cols-new grid-cols-1fr items-center justify-start">
            <a
              href={ConstructReference('/dashboard/send/')}
              className="text-black dark:text-white p-[7px] min-w-0 rounded-[50%] h-10 w-10"
            >
              <div className="grid grid-flow-col auto-cols-new gap-0 items-center justify-center">
                <svg
                  className="w-6 h-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.675 6.056c.784-.261 1.543.442 1.267 1.176l-4.558 12.15c-.31.824-1.559.824-1.87 0l-2.03-5.397-5.814-1.853a.905.905 0 01-.012-1.745l13.017-4.331z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </a>
            <button
              onClick={Logout}
              className="text-black dark:text-white p-[7px]  rounded-[50%] h-10 w-10"
            >
              <LogOut className="text-black dark:text-white" size={15} />
            </button>
          </div>
        </div>
        <div className="h-2 w-auto"></div>
      </div>

      <div className="mx-auto px-[15p] w-full max-w-[960px] flex-grow">
        <div className=" text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-6 xl:mb-0 sticky top-0 ">
          <ul className="flex flex-wrap -mb-px">
            {/* {pendingTransaction.map((item) => (
    <li key={item.value} onClick={() => setTab(item.value)}>
      <a
        href='#'
        className={`inline-block pb-2 px-2 pt-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
          item.value === tab && 'text-blue-500 !border-blue-500 active'
        }}`}
      >
        {item.name}
      </a>
    </li>
  ))} */}

            {tabConfig.map((item) => (
              <li key={item.value} onClick={() => setTab(item.value)}>
                <a
                  href="#"
                  className={`inline-block pb-2 px-2 pt-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                    item.value === tab &&
                    'text-blue-500 !border-blue-500 active'
                  }}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
<<<<<<< HEAD
        <div className="content">
          {tab === 'portfolio' && <PageBody currentUser={currentUser} />}
          {tab === 'history' && <TransactionHistory transactions={null} />}
        </div>
=======
>>>>>>> 2319f2bb125694294c24157292e692f202aa842b
      </div>
    </>
  );
};

export default ProfileContainer;
