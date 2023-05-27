import prisma from '@/libs/prismadb'
import { SafeListing } from '@/types'

export interface IListingsParams {
  userId?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params

    let query: IListingsParams = {}

    if (userId) {
      query.userId = userId
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeListings: SafeListing[] = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}
