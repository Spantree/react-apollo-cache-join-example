import { PrismaClient, Prisma as PrismaTypes } from '@prisma/client'
import { PrismaDelete, onDeleteArgs } from '@paljs/plugins'
import { NextApiRequest, NextApiResponse } from 'next'

class Prisma extends PrismaClient {
  constructor(options?: PrismaTypes.PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

const prisma = new Prisma()

export interface Context extends NextApi {
  prisma: Prisma
  select: any
}

interface NextApi {
  req: NextApiRequest
  res: NextApiResponse
}

export function createContext({ req, res }: NextApi): Context {
  return {
    req,
    res,
    prisma,
    select: {},
  }
}
