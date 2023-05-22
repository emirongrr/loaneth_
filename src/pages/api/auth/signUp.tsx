import jwt from 'jsonwebtoken'
import { NextApiRequest,NextApiResponse } from 'next';
import dbConnect from 'utils/MongooseConnect';
import UserModel from 'models/userModel';
import bcrypt from 'bcrypt'
import authMiddleware from 'utils/AuthMiddleware';

export  default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method != "POST"){
        res.status(405).json({error: 'only post requests are allowed'})
    }
    dbConnect()

    const {
        identificationString,
        firstName,
        lastName,
        email,
        birthDate,
        password
    } = req.body

    if(!identificationString || !firstName || !lastName || !birthDate || !email || !password) {
        res.status(422).json({
            msg: 'fillAllDetails',
            success: false,
        })
    }

    let user = await UserModel.findOne({email})
        if(user){
            res.status(400).json({ 
                msg: 'alreadyExists',
                success: false
            })
        } 

    user = new UserModel({
            identificationString,
            firstName,
            lastName,
            email,
            birthDate,
            password
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
        token,
        success: true,
        message: "userCreated"
    })

}