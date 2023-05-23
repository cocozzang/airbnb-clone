import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
