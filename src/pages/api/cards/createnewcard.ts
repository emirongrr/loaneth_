import { mongoConnect } from "libs";
import { NextApiRequest, NextApiResponse } from "next"
import { jwtAuth } from "libs";
import UserModel from "models/userModel";
import GenerateCard from "utils/cards/generateCard";
import { Card } from "libs/types/card";
import CardModel from "models/cardModel";
import { Exception } from "sass";


const SECRET_KEY: string = process.env.JWT_SECRET || "";
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
        
        const user = await UserModel.findById(_id)
        const {firstName, lastName} = user
        const {bankAccountId, cardLimit, type, processingMethod} = req.body
        
        const doesCardExist = await CardModel.findOne({'associatedBankAccount':bankAccountId})
        if(doesCardExist != undefined){
            return res.status(400).send({"message":"A card already exists for specified bank account."})
        }
        
        const card = GenerateCard(firstName, lastName, bankAccountId, cardLimit, type, processingMethod)

        const insertedCard = await CardModel.insertMany(card)
        
        return res.status(200).send(insertedCard)
    }
    catch(error){
        return res.status(500).send(error)
    }
}