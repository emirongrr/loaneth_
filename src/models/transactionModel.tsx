import { models, model, Schema, Types } from 'mongoose';

export interface Transaction{
  senderAccount: Types.ObjectId
  recipientAccount: Types.ObjectId
  category: String
  description: String
  amount: Number
  date: Date
}

const transactionSchema = new Schema({
  senderAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  recipientAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  category: {
    type:String,
    default:'Transfer'
  },
  description: {
    type:String,
    default:''
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // Diğer işlem özellikleri buraya eklenebilir
});

const Transaction = models.Transactions || model('Transaction', transactionSchema,'transactions');



export default Transaction
