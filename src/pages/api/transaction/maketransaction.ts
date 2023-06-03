import { NextApiRequest, NextApiResponse } from 'next';
import AccountModel from 'models/accountModel';
import Transaction from 'models/transactionModel';
import { mongoConnect } from 'libs';
import { jwtAuth } from 'libs';
import UserModel from 'models/userModel';
import { BankAccount, User } from 'libs/types/user';
import TransactionModel from 'models/transactionModel';
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `Cannot ${req.method} at ${req.url}.` });
  }
  try {
    await mongoConnect();

    const token = req.headers.authorization.split(' ')[1];
    const { ok, _id } = jwtAuth(token);
    if (!ok) {
      return res.status(401).send('Invalid token.');
    }

    const user: User = await UserModel.findById(_id);
    if (!user) {
      return res.status(404).send('User not found.');
    }
    const {
      senderAccountIBAN,
      recipientAccountIBAN,
      amount,
      category,
      description,
    } = req.body;

    const senderAccount = await AccountModel.findOne({
      iban: senderAccountIBAN,
    });
    if (!senderAccount) {
      return res.status(401).send('Bad request.');
    }

    const isAuthorized = user.bankAccounts.find((id) => {
      return id == senderAccount.id;
    });
    if (!isAuthorized) {
      return res.status(401).send('Unauthorized request.');
    }
    const recipientAccount = await AccountModel.findOne({
      iban: recipientAccountIBAN,
    });

    if (!recipientAccount) {
      return res.status(404).json({ message: 'Recipient account not found.' });
    }
    if (recipientAccount.currency != senderAccount.currency) {
      return res.status(401).json({ message: 'Currency mismatch.' });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds.' });
    }

    const senderNewBalance = senderAccount.balance - amount;
    const recipientNewBalance = recipientAccount.balance + amount;

    senderAccount.balance -= amount;
    recipientAccount.balance += amount;
    const transaction = new Transaction({
      senderAccount: senderAccount?._id,
      recipientAccount: recipientAccount._id,
      amount,
      category,
      description,
    });

    senderAccount.save();
    recipientAccount.save();

    const savedTransaction = await TransactionModel.create(transaction);

    res.status(200).json({
      message: 'Transfer success.',
      transactionId: savedTransaction._id,
    });
  } catch (error) {
    console.error('Para gönderme işlemi başarısız:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
