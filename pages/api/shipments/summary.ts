import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/service/prisma';

interface summaryData {
  totalRacimos: number;
  totalKilos: number;
  pesoPromedio: number;
}

const shipmentSummaryApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    const { year, month } = req.query;

    const summaryData = (await prisma.$queryRaw`
    select 
    sum(s."shippedBunches")::int as "totalRacimos",
    sum(s."deliveredWeight")::int as "totalKilos",
    sum(s."deliveredWeight")/sum(s."shippedBunches") as "pesoPromedio"
    from "Shipment" s
        WHERE 
            EXTRACT(MONTH FROM s."shipmentDate") = ${parseInt(
              month as string
            )} AND
            EXTRACT(YEAR FROM s."shipmentDate") = ${parseInt(year as string)}
    group by EXTRACT(MONTH FROM s."shipmentDate")
    `) as summaryData[];

    return res.status(200).json({ summaryData: summaryData[0] });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default shipmentSummaryApi;
