import ConstructReference from 'libs/refconstructor';
import {BankAccount, User} from 'libs/types/user'
import Account, { IAccount } from 'models/accountModel';
import UserModel, { IUser } from 'models/userModel';
import { useRouter } from "next/router";


type ProfileContainerProps = {
    currentUser: User;
  };

  const USDFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

const ProfileContainer:React.FC<ProfileContainerProps> = ({currentUser}) =>
{
    const router = useRouter()
    const mainBankAccount: BankAccount = currentUser?.bankAccounts[0]
    let totalBalance_TL = 0
    currentUser.bankAccounts.forEach(account =>{
        totalBalance_TL += account.balance
    })

    const copyIBAN = () => {
        console.log(currentUser)
        const mainBankAccountIBAN = mainBankAccount.iban
        navigator.clipboard.writeText(String(mainBankAccountIBAN));
        alert(String(mainBankAccountIBAN))
        //alert("Kullanıcı adı kopyalandı!");
      };

    const Logout = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("token");
        router.reload()
      };
      

    return(
        <div className="w-full max-w-[960px] shadow-2xl rounded-[12px] mx-auto px-3.5 box-border block mt-4">
            <div className="h-6 w-auto"></div>
            <div className="grid grid-flow-col grid-cols-new gap-0 items-start flex justify-between box-border">
                <div className="grid grid-flow-col grid-cols-new gap-5 items-start justify-start">
                    <div className="rounded-2xl w-[104px] h-[104px] relative">
                        <img className="w-full h-full object-cover object-center block rounded-xl" src='/svg/profile.png'/>
                    </div>
                    <div className="grid gap-2 grid-cols-new p-0 m-0 box-border">
                        <div className="grid grid-flow-col auto-cols-new gap-1 items-center justify-start h-6">
                            <div className="block font-graphik text-20 leading-6 font-medium text-black dark:text-white tracking-tighter text-current whitespace-nowrap"> {`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
                        </div>
                        <span>
                            <div className="grid gap-4 grid-cols-minmax-auto">
                                <div className="grid grid-flow-col auto-cols-new gap-4 items-center break-words text-black dark:text-white justify-start text-4xl leading-12 ">{USDFormatter.format(totalBalance_TL)}</div>
                                <div className={`block font-graphik text-base leading-5 font-medium tracking-tight ${-3>= 0 ? 'text-green' : 'text-red-500'}`}>2</div>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="grid grid-flow-col auto-cols-new grid-cols-1fr gap-3 items-center justify-start">
                    <button onClick={copyIBAN} className="bg-transparent text-black dark:text-white border-none outline-none">iban</button>
                    <a href={ConstructReference("/dashboard/send/")} className="text-black dark:text-white p-[7px] min-w-0 rounded-[50%] h-10 w-10">
                        <div className="grid grid-flow-col auto-cols-new gap-0 items-center justify-center">
                           <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.675 6.056c.784-.261 1.543.442 1.267 1.176l-4.558 12.15c-.31.824-1.559.824-1.87 0l-2.03-5.397-5.814-1.853a.905.905 0 01-.012-1.745l13.017-4.331z" fill="currentColor"></path></svg>
                        </div>
                    </a>
                    <button onClick={Logout}className="bg-transparent border-none text-black dark:text-white outline-none">logout</button>
                </div>
            </div>
            <div className="h-2 w-auto"></div>


        </div>
    );
}

export default ProfileContainer