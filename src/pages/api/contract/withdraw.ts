import { NextApiRequest, NextApiResponse } from "next";
import { setUserLimit } from "utils/contract/setLimit";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method != 'POST') {
        return res.status(401).send(`Cannot ${req.method} at ${req.url}`);
      }
      
    try {
      const {UserAddress, UserAddressLimit} = req.body;
      const result = await setUserLimit(UserAddress,UserAddressLimit);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Sunucu hatası' });
    }
  }
