import { NextApiRequest, NextApiResponse } from 'next';
import { Role } from '@prisma/client';
import prisma from '@/service/prisma';

interface ResponseData {
  roles: Role[];
}

const rolesApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const roles = await prisma.role.findMany();
  res.status(200).json({ roles });
};

export default rolesApi;
