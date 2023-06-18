import ConstructReference from 'libs/refconstructor';
import { BankAccount, User } from 'libs/types/user';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  IconArrowsDiagonalMinimize2,
  IconChevronDown,
  IconDots,
  IconShare3,
} from '@tabler/icons-react';
import FormatCurrency from 'utils/formatters/currencyFormatters';

type ProfileContainerProps = {
  currentUser: User;
};

const ProfileContainer: React.FC<ProfileContainerProps> = ({ currentUser }) => {
  const { t } = useTranslation('dashboard');
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
    <div className='flex justify-between items-center mt-6 mb-8 m-4 xl:mb-0 flex-col md:flex-row gap-5'>
    <div className='rounded-lg flex gap-5 items-center w-full'>
      <Image
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA7NJREFUeF7tnbFtHEEMRbmR4AbUhTL1ociAL3EDSh25gCtEyRkwYOBqce42HEpFPAEPxD7nNKnPNyRnb3b2ePz38D7iv68vN9G77/r3/aIGcQSAqv8EQBVAJbAKoMo/VYBmgGYAeQ267psBmgFUApsBVPmbAaYZoBlAXoOu+2aAZgCVwGYAVf5mgGaAfgvoxyCzCNUCTPWnFlALsFvAj+szOg/w//ZTXkPndv/lckUCHAGA9NONA0BPgRtAALj6694DQE+BG0AAuPrr3gNAT4EbQAC4+uveA0BPgRtAALj6694DQE+BG0AAuPrr3gNAT4EbQAC4+uveA0BPgRtAALj6694xAPT1cHqun/4B9nkEO356rBwfCQsAdiCDAhwA8omkKgB8scMWkDZxO/4qQBUAMdwMgOSbqQLUAhBCDYHwWDMVEGVvqgD4xQ67hAYAvCiy5wA9B0CLqArA3qxqG9g2EC3AtoFIvobAhkB5F1MLqAWgGlYLQPLVAnALgPqf3nx9Czh9BqEAAQAF3G4eANszCOMPACjgdvMA2J5BGH8AQAG3mwfA9gzC+AMACrjdPAC2ZxDGHwBQwO3mAbA9gzD+AIACbjcPgO0ZhPEHABRwu3kAbM8gjB8D8Pr0B30vAMaPzakANAB6LJ76p/ZHADAJA4Dph62rAEzCKgDTb/2RuAAIgIZAwkAzAFHvE2ybAZiItQCmXzMA1A+bVwGYhFUApl8VAOqHzasATMIqANOvCgD1w+ZVACZhFYDpVwWA+mHzKgCTsArA9NtfAezPx9MVbD+KteOnt6wdAcBKQADAO3psAVn6Z+z4qwDwsuoAuD6jM4H0smZ7BQVAACAGbIBrAbUABHC7ACRfQ+A0A1wQQvQ5Ri2gFoAArAUg+WoBtYB7LQCtIXsbhYKfKkAVoArgfvOGTtFVgJ4EIgbsFoa3gY/ws3FIvZn5/usJ/Rdv3/4ie2q8PX78xZCzCxgAkIDtAm6PvwpwcoADIAAe0IEQqF9DoDzEVgEgwc0AJxcwAAIAKWA/x6gFoPTtf5AVAAHQLoAw0AxA1Ou3gGkG6McguISYeTMA02/9g6wAODsA9Lp4+0AE9Q/zjy+IoPHTE1H4hhD7D6D+AwB+MYQmgBJM/QdAACAGbICp/1oASv80A9ASTAmm/mH+A4AmIADcV8tqAbAE2ABT/wEQAOybQbWAG0LI1q8KgNLXLkC/KJGuIJj/dgE0AXSIof4DoCeBiAEbYOq/GQClvxmgGQDeUkZbGK0AH6653W4HFud0AAAAAElFTkSuQmCC'
        alt="0xf3b2badd991ed22bc2532641de87a8bb199979e4's image"
        width={104}
        height={104}
        className='rounded-2xl object-cover block w-[104px] h-[104px]'
      />
      <div className='flex flex-col'>
        <div className='flex gap-2 items-center'>
          <span className='text-white font-semibold text-xl'>
            0xf3b2…79e4
          </span>
          <button className='outline-none p-[5px] h-6 w-h-6 hover:bg-[#29292c] flex items-center justify-center rounded-lg'>
            <IconChevronDown color='#fff' size={14} />
          </button>
        </div>
        <div className='flex items-center gap-2'>
          <div className='text-3xl'>
            <span className='text-white font-semibold text-[28px] xl:text-[40px]'>
              $
            </span>
            <span className='text-white font-semibold text-[28px] xl:text-[40px]'>
              0
            </span>
            <span className='text-gray-500 font-semibold text-[28px] xl:text-[40px]'>
              .
            </span>
            <span className='text-gray-500 font-semibold text-[28px] xl:text-[40px]'>
              00
            </span>
          </div>
          <button className='outline-none p-[5px] h-6 w-h-6 hover:bg-[#29292c] flex items-center justify-center rounded-lg'>
            <IconDots color='#fff' size={14} />
          </button>
        </div>
        <span className='text-[#4fbf67]'>+0% ($0.00)</span>
      </div>
    </div>

    <div className='flex gap-4 w-full md:w-64'>
      <button className='ring-1 ring-[#45464a] p-[7px] h-8 w-8 hover:bg-[#29292c] flex items-center justify-center rounded-full'>
        <IconShare3 color='#fff' />
      </button>

      <button className='text-sm ring-1 ring-[#45464a] text-white py-[9px] px-[19px] h-8 hover:bg-[#29292c] flex items-center justify-center rounded-lg w-full'>
        Remove Wallet
      </button>
    </div>
  </div>
  );
};

export default ProfileContainer;
