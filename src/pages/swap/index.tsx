import { Input } from '@material-ui/core';
import { Button } from '@tremor/react';
import Layout from 'components/Layout';

export default function About() {
  return (
    <Layout>
      <div className='flex w-screen h-screen items-center justify-center'>
        <div className='w-[500px] h-[400px]'>
          <div className='flex flex-col gap-2'>
            <Input className='dark:text-white text-black '  />
            <Button>Deposit</Button>
            <Button>Withdraw</Button>
            <p>Balance:</p>
            <p>Loan:</p>
            <p>Address:</p>
            </div>
          </div>
        </div>
    </Layout>
  );
}
