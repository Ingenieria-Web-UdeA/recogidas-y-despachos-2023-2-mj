import prisma from '@/service/prisma';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { Enum_RoleName } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  shipments?: unknown;
  message?: string;
}

const shipmentsApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { roleName } = await checkPrivateApi(req, res);

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
      select: {
        id: true,
        shippedBunches: true,
        shipmentDate: true,
        bunchWeight: true,
        deliveredWeight: true,
        userId: roleName === Enum_RoleName.ADMIN,
      },
    });

    return res.status(200).json({ shipments });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default shipmentsApi;
