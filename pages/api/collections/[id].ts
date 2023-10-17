import prisma from '@/service/prisma';
import { Collection } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  collection?: Collection;
  message?: string;
}

const collectionApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'PUT') {
    const { bunches } = req.body;
    const collectionId = req.query.id as string;

    const updatedCollection = await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        bunches: parseInt(bunches),
      },
    });

    return res.status(200).json({ collection: updatedCollection });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default collectionApi;
