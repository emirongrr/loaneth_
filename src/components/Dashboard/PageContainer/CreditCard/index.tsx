import React from 'react';
import { useTranslation } from 'react-i18next';

type CreditCardProps = {
  creditCardInfo: {
    limit: number;
    availableLimit: number;
  };
};

const CreditCard: React.FC<CreditCardProps> = ({ creditCardInfo }) => {
  const { t } = useTranslation('dashboard');
  const { limit, availableLimit } = creditCardInfo;

  return (
    <div className="flex justify-center">
      <div className="w-[300px] h-[340px]  overflow-auto">
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-gray-600 text-center mb-4">
            {limit && availableLimit ? (
              <>
                {t('TotalCreditCardLimit')}: {limit} <br />
                {t('CreditCardAvailableLimit')}: {availableLimit}
              </>
            ) : (
              <>
                {t('MissingCreditCard')}
                <button className="bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600">
                  {t('ApplyForCreditCard')}
                </button>
                <p className="text-gray-600 text-center mt-2">
                  {t('ApplyForCreditCardDescription')}
                </p>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
