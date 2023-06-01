import { NextApiRequest, NextApiResponse } from 'next';
import Account from 'models/accountModel';
import Transaction from 'models/transactionModel';
import { mongoConnect } from 'libs';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mongoConnect();


    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { senderAccount, recipientIban, amount } = req.body;

    const sender = await Account.findOne({ accountNumber: senderAccount });

    if (!sender) {
      return res.status(404).json({ message: 'Gönderen hesap bulunamadı' });
    }

    const recipient = await Account.findOne({ iban: recipientIban });

    if (!recipient) {
      return res.status(404).json({ message: 'Alıcı hesap bulunamadı' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Yetersiz bakiye' });
    }

    sender.balance -= amount;
    recipient.balance += amount;

    const transaction = new Transaction({
      senderAccount: sender._id,
      recipientAccount: recipient._id,
      amount,
      date: new Date(),
    });

    const savedTransaction = await transaction.save();

    res.status(200).json({ message: 'Para gönderme işlemi başarıyla tamamlandı', transactionId: savedTransaction._id });
  } catch (error) {
    console.error('Para gönderme işlemi başarısız:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
