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
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
  loan: number;
  iban: string;
};

export type Transaction = {
  senderAccount: BankAccount;
  recipientAccount: BankAccount;
  category: String;
  description: String;
  amount: Number;
  date: Date;
};
