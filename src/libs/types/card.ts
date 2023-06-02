import { BankAccount } from "./user"

export type Card = {
    firstName:string
    lastName:string
    number:string
    type:string
    processingMethod:string
    expireYear:string
    expireMonth:string 
    cvv:string
    allowDigitalTransactions: boolean
    cardLimit: number
    associatedBankAccount: BankAccount
}