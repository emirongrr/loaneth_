import { useEffect, useState } from 'react';
import CampaignSlider from '../CampaignSlider';
import CreditCard from '../CreditCard';
import CurrencyTable from '../CurrencyTable';
import TransactionHistory from '../TransactionHistory';
import { User } from 'libs/types/user';
import { Card } from 'libs/types/card';
type InfoBoxProps = {
  currentUser: User;
};

const InfoBox: React.FC<InfoBoxProps> = ({ currentUser }) => {
  const [filteredCurrencies, setFilteredCurrencies] = useState<
    {
      name: string;
      value: string;
      unit: string;
      type: string;
    }[]
  >([]);
  const creditCard: Card = currentUser?.cards?.find((card) => {
    return card.type == 'CREDIT';
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/exchange_rates'
        );
        const data = await response.json();
        console.log(data);

        const filteredData = Object.values(data.rates)
          .filter((currency: any) =>
            [
              'Euro',
              'US Dollar',
              'Bitcoin',
              'Ether',
              'Gold - Troy Ounce',
              'Silver - Troy Ounce',
            ].includes(currency.name)
          )
          .map((currency: any) => {
            const valueInTL = (data.rates.try.value / currency.value).toFixed(
              2
            );
            return {
              name: currency.name,
              value: valueInTL,
              unit: currency.unit,
              type: currency.type,
            };
          });

        setFilteredCurrencies(filteredData);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchData();
  }, []);

  const campaigns = [
    {
      id: 1,
      title: 'Spotify',
      description:
        'Bizi kullanarak yaptığınız bütün spotify alışverişlerinde %50 iade',
      image: '/svg/spotify.png',
    },
    {
      id: 2,
      title: 'Apple',
      description: 'Apple ürünlerinde fırsatlar',
      image: '/svg/apple.png',
    },
    {
      id: 3,
      title: 'YemekSepeti',
      description: 'İndirimli iştah kabartan lezzetler',
      image: '/svg/yemeksepeti.png',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center"></div>
      <div className="h-[48px] w-auto"></div>
      <div className="p-[24px 24px 0px] shadow-elevation-100 rounded-[12px]  border-neutral-300">
        <a>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px] mb-4">
              <CreditCard creditCard={creditCard} />
            </div>
            <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px] mb-4">
              <CampaignSlider campaigns={campaigns} />
            </div>
            <div className="flex flex-col bg-opacity-50 backdrop-filter shadow-2xl backdrop-blur-md h-[340px] justify-between p-[16px] gap-[30px] shadow-elevation-100 rounded-[12px] border border-solid border-neutral-300 w-[300px] mb-4">
              <CurrencyTable currencies={filteredCurrencies} />
            </div>
          </div>
        </a>
        <div className="h-6 w-auto"></div>
        <div className="asset"></div>
      </div>
    </div>
  );
};

export default InfoBox;
