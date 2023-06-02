import { Types } from "mongoose";
import { Adress } from "./adress";
import { Card } from "./card";

export type User = {
  identificationString: String
  firstName: String
  lastName:String
  birthDate:Date
  adress: Adress
  phoneNumber:String
  email: String;
  password: String
  cards: Card[]
  bankAccounts: BankAccount[];
  transactions: Transaction[];
  };

export type  BankAccount = {
  accountNumber: String
  accountType: String
  balance: number
  currency: String
  loan: Number
  iban: String
}

export type Transaction = {
  senderAccount: BankAccount
  recipientAccount: BankAccount
  category: String
  description: String
  amount: Number
  date: Date
}