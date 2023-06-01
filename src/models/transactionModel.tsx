import { models, model, Schema, Types } from 'mongoose';

const TRANSACTION_CATEGORIES = [
  'TRANSFER',
  'PURCHASE',
  'GETLOAN',
  'PAYLOAN'
]
export interface Transaction{
  senderAccount: Types.ObjectId
  recipientAccount: Types.ObjectId
  category: String
  description: String
  amount: Number
  date: Date
}

const transactionSchema = new Schema<Transaction>({
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
    default:'Transfer',
    validate:{
      validator: function(value){
        if(TRANSACTION_CATEGORIES.indexOf(value) == -1)
          return false
        return true
      },
      message:'invalidCategory'
    },
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
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Transaction = models.Transactions || model('Transaction', transactionSchema,'transactions');



export default Transaction
