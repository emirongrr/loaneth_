import { models, model, Schema } from 'mongoose';

const bankAccountSchema : Schema = new Schema(
    {
        key:{
            type: String
        }
    }
)

const BankAccountModel = models.User || model('BankAccount', bankAccountSchema)

export default BankAccountModel