import { useContractWrite, usePrepareContractWrite } from "wagmi";
import contractInterfaceAbi from 'contract/abi/bank_contract_abi.json'
import { env } from "process";

export default function WriteContractButtonForWithdraw() {

  const { config, error } = usePrepareContractWrite({
    address: "0xA19fD19043a7bcf4ca6c046a452bEedA0bce0D4E",
    abi: contractInterfaceAbi,
    functionName: "withdraw",
    args: ['1000000000000000'],
    account: process.env.OWNER_ADDRESS
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <div>
        <button
          disabled={!write}
          onClick={() => write?.()}
          className="px-6 py-2.5 bg-blue-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Withdraw
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && (
          <div>
            Transaction:{" "}
            <a
              href={"https://goerli.etherscan.io/tx/" + data?.hash}
              target="_blank"
              rel="noopenner noreferrer"
            >
              https://goerli.etherscan.io/tx/{data?.hash}
            </a>
          </div>
        )}
        {error && (
          <div>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}
      </div>
    </>
  );
}