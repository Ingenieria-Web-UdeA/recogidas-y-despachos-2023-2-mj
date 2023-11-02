import prisma from '@/service/prisma';
import { checkProtectedApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  indicators?: unknown;
  message?: string;
}

const collectionsIndicatorsApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await checkProtectedApi(req, res, 'ADMIN');

  if (req.method === 'GET') {
    const indicators = await prisma.$queryRaw`
                select * from recogidas_mensuales_por_lote
        `;
    return res.status(200).json({ indicators });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default collectionsIndicatorsApi;
