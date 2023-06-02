import { User } from "libs/types/user";
import InfoBox from "./Box";
import CampaignSlider from "./CampaignSlider";
import ChartSection from "./PerformanceAndAssetChart";
import TransactionHistory from "./TransactionHistory";

type PageBodyContainerProps = {
  currentUser: User;
};
const PageBody : React.FC<PageBodyContainerProps> = ({ currentUser }) =>{

    const transactions = [
        {
          id: 1,
          date: "2023-05-01",
          description: "Grocery Shopping",
          category: "Expenses",
          amount: -50,
        },
        {
          id: 2,
          date: "2023-05-02",
          description: "Salary Deposit",
          category: "Income",
          amount: 2000,
        },
        {
          id: 3,
          date: "2023-05-05",
          description: "Dinner with Friends",
          category: "Entertainment",
          amount: -80,
        },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },      {
            id: 3,
            date: "2023-05-05",
            description: "Dinner with Friends",
            category: "Entertainment",
            amount: -80,
          },
      ];

      
      
    
    return(
        <div className="mx-auto px-[15p] w-full max-w-[960px] flex-grow">
            <div className="h-6 w-auto"></div>
                <div className="grid gap-30 grid-cols-new">
                <ChartSection currentUser={currentUser}/>
                <InfoBox/>
                <TransactionHistory transactions={transactions}/>
                </div>
        </div>
    
    );
    
}

export default PageBody