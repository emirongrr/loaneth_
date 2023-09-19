import { Input } from '@material-ui/core';
import { Button } from '@tremor/react';
import Layout from 'components/Layout';
import { useAccount,usePrepareContractWrite ,useContractWrite } from 'wagmi';
import contractInterfaceAbi from 'contract/abi/bank_contract_abi.json'
import { parseEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { readContracts } from '@wagmi/core'
import WriteContractButton from 'components/WriteContractButton/deposit';
import WriteContractButtonForWithdraw from 'components/WriteContractButton/withdraw';
import WriteContractButtonForDeposit from 'components/WriteContractButton/deposit';
import { setUserLimit } from 'utils/contract/setLimit';

export default function GetLoanWithEth() {
  const {address,isConnected} = useAccount();

  const handleSetUserLimit = async () => {
    const response = await fetch('/api/contract/withdraw');
    const data = await response.json();
    console.log(data);
  };

  return (
    <Layout>
      <div className='flex w-screen h-screen items-center justify-center'>
        <div className='w-[500px] h-[400px]'>
          <div className='flex flex-col gap-2'>
            <Button onClick={handleSetUserLimit}>Pay</Button>
            <ConnectButton/>
            {isConnected && ( 
              <>
            <WriteContractButtonForDeposit/>
            <WriteContractButtonForWithdraw/>
             </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
