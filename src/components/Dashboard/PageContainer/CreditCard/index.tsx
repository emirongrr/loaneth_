import React from "react";

type CreditCardProps = {
  creditCardInfo: {
    limit: number;
    availableLimit: number;
  };
  applyButtonVisible: boolean;
};

const CreditCard: React.FC<CreditCardProps> = ({ creditCardInfo, applyButtonVisible }) => {
  const { limit, availableLimit } = creditCardInfo;

  return (
    <div className="flex justify-center">
      <div className="w-[300px] h-[340px]  overflow-auto">
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-gray-600 text-center mb-4">
            {limit && availableLimit ? (
              <>
                Limit: {limit} <br />
                Available Limit: {availableLimit}
              </>
            ) : (
              "You don't have a credit card."
            )}
          </p>
          {applyButtonVisible && (
            <button className="bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600">
              Apply Now
            </button>
          )}
          {applyButtonVisible && (
            <p className="text-gray-600 text-center mt-2">
              Apply for a credit card with the Apply Now button.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
