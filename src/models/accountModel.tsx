import { models, model, Schema } from 'mongoose';
export interface Account{
  accountNumber: String
  accountType: String
  balance: Number
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
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
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
});

const Account = models.Account || model('Account', accountSchema, 'bankAccounts');

export default Account