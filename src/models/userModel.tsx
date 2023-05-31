import { models, model, Schema, Types, SchemaTypes } from 'mongoose';
import { Adress } from 'libs/types/adress';
export interface IUser {

    identificationString: String
    email: String;
    firstName: String
    lastName:String
    birthDate:Date
    password: String
    adress: Adress
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
        adress:{
            type: SchemaTypes.Mixed,
            required: true,
            select: true,

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
