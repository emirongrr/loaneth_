import { NextApiRequest, NextApiResponse } from 'next';
import LogUserModel, { ILogUser }  from 'models/logUserSchema';
import { mongoConnect } from 'libs';
import cron from 'node-cron';
import UserModel from 'models/userModel';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await mongoConnect();
      const logUsers = await LogUserModel.find({});
      res.status(200).json(logUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else {
    res.status(405).json({ error: 'Only GET requests are supported' });
  }
}

// Cron job for capturing snapshots every 24 hour
cron.schedule('0 0 */1 * *', async () => {
    try {
        const users = await UserModel.find({});
    
        users.forEach(async (user) => {
          const logUser = new LogUserModel({
            id: user._id,
            snapshot: [
              {
                totalAssetValue: 0, 
                date: new Date(),
              },
            ],
          });
    
          await logUser.save();
        });
  } catch (error) {
    console.error('Error capturing snapshot:', error);
  }
});
