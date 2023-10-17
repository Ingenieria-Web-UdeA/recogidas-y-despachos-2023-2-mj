import prisma from '@/service/prisma';
import { Lot } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  lots?: Lot[];
  message?: string;
}

const lotesApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'GET') {
    const lots = await prisma.lot.findMany();
    return res.status(200).json({ lots });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default lotesApi;
