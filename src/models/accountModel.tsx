import { models, model, Schema } from 'mongoose';

const CURRENCIES = [
  'USD',
  'EUR',
  'TL'
]
const ACCOUNT_TYPES = [
  'SAVING',
  'CHECKING',
  'MMA',
  'CD'
]
export interface Account{
  accountNumber: String
  accountType: String
  balance: Number
  currency: String
  loan: Number
  iban: String
}

const accountSchema = new Schema<Account>({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Account number'ın belirli bir formata uyduğunu kontrol et
        const accountNumberRegex = /^\d{10}$/;
        return accountNumberRegex.test(value);
      },
      message: 'invalidAccountNumber'
    }
  },
  accountType: {
    type: String,
    required: true,
    validate:{
      validator: function(value){
        if(ACCOUNT_TYPES.indexOf(value) == -1)
          return false
        return true
      },
      message: 'invalidAccountType'
    },
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  currency:{
    type: String,
    required: true,
    validate:{
      validator: function(value){
        if(CURRENCIES.indexOf(value) == -1)
          return false
        return true
      },
      message:'invalidCurrency'
    }
  },
  loan: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  iban: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // IBAN'ın belirli bir formata uyduğunu kontrol et
        const ibanRegex = /^[A-Z]{2}\d{2}[A-Z\d]{4}\d{7}([A-Z\d]?){0,16}$/;
        return ibanRegex.test(value);
      },
      message: 'invalidIBAN'
    }
  },
  // Diğer hesap özellikleri buraya eklenebilir
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Account = models.Account || model('Account', accountSchema, 'bankAccounts');

export default Account