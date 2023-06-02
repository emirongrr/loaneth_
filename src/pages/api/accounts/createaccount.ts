import { mongoConnect } from "libs";
import { NextApiRequest, NextApiResponse } from "next";
import { jwtAuth } from "libs";
import { generateRandomAccountNumber, generateRandomIBAN } from "utils/accounts/generateAccount";
import { BankAccount } from "libs/types/user";
import AccountModel from "models/accountModel";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(req.method != 'POST'){
        return res.status(401).send(`Cannot ${req.method} at ${req.url}`)
    }

    try{
        await mongoConnect()
        const token = req.headers.authorization.split(" ")[1] 
        const {ok, _id} = jwtAuth(token)
        if(!ok){
            return res.status(401)
        }
        const {accountType, currency, balance, loan, doCreateCard} = req.body
        if(!accountType || !currency){
            return res.status(401).send({'message':"All fields are required."})
        }
        
        const accountNumber = generateRandomAccountNumber();
        const iban = generateRandomIBAN(accountNumber);
        const account ={
            accountNumber,
            accountType,
            balance: balance || 0,
            currency,
            loan: loan || 0,
            iban
        }

        const savedAccount = await AccountModel.insertMany(account)
        if(doCreateCard){
            const headersList = {
                Accept: "*/*",
                "Content-Type": "application/json",
                authorization: `${req.headers.authorization}`,
            };
            const body = {
                bankAccountId: savedAccount!._id,
                cardLimit:-1,
                type:'DEBIT',
                processingMethod:'MASTERCARD'
            }
            const response = await fetch('/api/cards/createnewcard',{
                method:'POST',
                headers:headersList,
                body:JSON.stringify(body)
            })
            if(response.ok){
                return res.status(200)
            }else{
                return res.status(400).send(await response.json())
            }
        }

        return res.status(200).send(savedAccount)

    }
    catch(error){
        return res.status(500).send(error)
    }
}