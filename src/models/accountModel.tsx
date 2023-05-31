const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
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
      message: 'Geçerli bir hesap numarası giriniz (10 rakam).'
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
      message: 'Geçerli bir IBAN giriniz.'
    }
  },
  // Diğer hesap özellikleri buraya eklenebilir
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
