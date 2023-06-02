import { BankAccount } from "./user"

export type Card = {
    firstName:String
    lastName:String
    number:String
    type:String
    processingMethod:String
    expireYear:String
    expireMonth:String 
    cvv:String
    allowDigitalTransactions: boolean
    cardLimit: number
    associatedBankAccount: BankAccount
}