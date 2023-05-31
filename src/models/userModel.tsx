import { models, model, Schema, Types } from 'mongoose';

export interface IUser {

    identificationString: String
    email: String;
    firstName: String
    lastName:String
    birthDate:Date
    password: String
    bankAccounts: Types.ObjectId[];
   }

const userSchema : Schema = new Schema<IUser>(
    {
        identificationString: {
            type: String,
            unique: true,
            required: true

        },
        firstName:{
            type: String,
            required: true,
            index: true
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        birthDate:{
            type: Date,
            required: true,
        },
        password:{
            type: String,
            required: true,
            select: false
        },
        bankAccounts:[{
                type: Schema.Types.ObjectId,
                required:true,
                ref:'Account'
            }
        ]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

const UserModel = models.User || model('User', userSchema)

export default UserModel
