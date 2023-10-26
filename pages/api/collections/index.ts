import prisma from '@/service/prisma';
import { checkPrivateApi } from '@/utils/checkServerSession';
import { NextApiRequest, NextApiResponse } from 'next';

interface ResponseData {
  collections?: unknown;
  message?: string;
}

const collectionsApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await checkPrivateApi(req, res);

  if (req.method === 'GET') {
    const { year, month } = req.query;

    const collections = await prisma.$queryRaw`
    SELECT 
        c.id,
        c."collectionDate",
        l."name",
        c.bunches 
    FROM "Collection" c
    JOIN "Lot" l
        ON c."lotId" = l.id
    WHERE 
        EXTRACT(MONTH FROM c."collectionDate") = ${parseInt(
          month as string
        )} AND
        EXTRACT(YEAR FROM c."collectionDate") = ${parseInt(year as string)}
    ORDER BY 
        c."collectionDate" ASC, 
        CAST(REPLACE(l."name", 'Lote ', '') AS INT) ASC;
    
    `;

    return res.status(200).json({ collections });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default collectionsApi;
