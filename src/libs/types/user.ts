import { Types } from 'mongoose';
import { Adress } from './adress';
import { Card } from './card';

export type User = {
  identificationString: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  adress: Adress;
  phoneNumber: string;
  email: string;
  password: string;
  cards: Card[];
  bankAccounts: BankAccount[];
  transactions: Transaction[];
};

export type BankAccount = {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  loan: number;
  iban: string;
};
export const emptyAccount: BankAccount = {
  id: 'nan',
  accountNumber: 'nan',
  accountType: 'nan',
  balance: -1,
  currency: 'nan',
  loan: -1,
  iban: 'nan',
};
export type Transaction = {
  id: string;
  senderAccount: BankAccount;
  recipientAccount: BankAccount;
  category: String;
  description: String;
  amount: Number;
  date: Date;
};

export const emptyTransaction: Transaction = {
  id: 'nan',
  senderAccount: emptyAccount,
  recipientAccount: emptyAccount,
  category: 'nan',
  description: 'nan',
  amount: 0,
  date: new Date(),
};
