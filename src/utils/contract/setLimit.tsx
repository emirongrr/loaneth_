import CONTRACT_ABI from 'contract/abi/bank_contract_abi.json'
import { AlchemyProvider } from 'ethers';
const { ethers } = require("ethers");

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const NETWORK_NAME = "goerli"

export async function setUserLimit(userAddress, limitAmount) {
const alchemyProvider = new AlchemyProvider(NETWORK_NAME, ALCHEMY_API_KEY);
const wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  try {
    const limitInWei = ethers.parseEther(limitAmount.toString());
    const txResponse = await contract.setUserLimit(userAddress, limitInWei);
    const receipt = await txResponse.wait();
    
    console.log('Transaction completed. Transaction hash:', receipt.transactionHash);
  } catch (error) {
    console.error('Error:', error);
  }
}

