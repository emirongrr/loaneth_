import { models, model, Schema, Types } from 'mongoose';

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  recipientAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  category: {
    type:String,
    default:'Transfer'
  },
  descreption: {
    type:String,
    default:null
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

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
