import prisma from '@/service/prisma';
import { Shipment } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  shipments?: Shipment[];
  message?: string;
}

const shipmentsApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'GET') {
    const { year, month } = req.query;

    const shipments = await prisma.shipment.findMany({
      where: {
        AND: [
          {
            shipmentDate: {
              gte: new Date(`${year}-${month}-01`),
            },
          },
          {
            shipmentDate: {
              lt: new Date(`${year}-${parseInt(month as string) + 1}-01`),
            },
          },
        ],
      },
      orderBy: {
        shipmentDate: 'asc',
      },
    });

    return res.status(200).json({ shipments });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default shipmentsApi;
