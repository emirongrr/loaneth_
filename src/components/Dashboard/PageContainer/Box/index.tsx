import CampaignSlider from "../CampaignSlider";
import CreditCard from "../CreditCard";
import CurrencyTable from "../CurrencyTable";
import TransactionHistory from "../TransactionHistory";

const InfoBox = () => {
    const currencies = [
        { name: "EUR", value: 1.23 },
        { name: "TRY", value: 8.45 },
        { name: "USD", value: 1.00 },
        { name: "USD", value: 1.00 },
        { name: "USD", value: 1.00 },
        { name: "USD", value: 1.00 },
      ];

      const creditCardInfo = {
        limit: 5000,
        availableLimit: 2500,
      };

      const campaigns = [
        {
          id: 1,
          title: "Kampanya 1",
          description: "Bu kampanya hakkında bir açıklama",
          image: "campaign1.jpg",
        },
        {
          id: 2,
          title: "Kampanya 2",
          description: "Bu kampanya hakkında bir açıklama",
          image: "campaign2.jpg",
        },
        {
          id: 3,
          title: "Kampanya 3",
          description: "Bu kampanya hakkında bir açıklama",
          image: "campaign3.jpg",
        },
      ];
      
    return (
      <div>
        <div className="flex justify-between items-center"></div>
        <div className="h-[48px] w-auto"></div>
        <div className="p-[24px 24px 0px] shadow-elevation-100 rounded-[12px]  border-neutral-300">
          <a>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px] mb-4" >
              <CreditCard creditCardInfo={creditCardInfo} applyButtonVisible={false}/>
              </div>
              <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px] mb-4" >
              <CampaignSlider campaigns={campaigns}/>
              </div>
              <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px] mb-4" >
              <CurrencyTable currencies={currencies}/> 
              </div>
            </div>
          </a>
          <div className="h-6 w-auto"></div>
          <div className="asset"></div>
        </div>
      </div>
    );
  }
  
  export default InfoBox;
  