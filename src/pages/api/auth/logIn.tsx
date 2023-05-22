import jwt from 'jsonwebtoken'
import { NextApiRequest,NextApiResponse } from 'next';
import dbConnect from 'utils/MongooseConnect';
import UserModel from 'models/userModel';
import bcrypt from 'bcrypt'

export  default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method != "POST"){
        res.status(405).json({error: 'only post requests are allowed'})
        return
    }
    //create user object
    const {email, password} = req.body
    //establish database connection
    dbConnect();
    //verify user data
    const user = await UserModel.findOne({email}).select('+password');
    if(!user){
        res.status(422).json({
        message : "userDoesNotExist",
        success: false,
        user: user
    })
    return
    }
    //if data is not valid send error
    //res.status(200).json({pw2: user.password})
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch ){
        res.status(422).json({ 
            message: 'invalidCredentials',
            success: false 
        })
        return
    } 
    //if data is valid send token back
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      
    res.status(200).json({
        message:"sucessfullLogin",
        success: true,
        token
    });
}
