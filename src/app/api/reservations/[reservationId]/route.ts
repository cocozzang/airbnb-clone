import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

interface IParams {
  reservationId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID')
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
      // reservation의 userId가 currenUser.id인 경우 ( 예약잡은사람이 이후 예약을 취소 할 수 있다.)
      // reservation의 listing.userId가 currentUser.id인 경우 ( 집주인측에서 예약 잡힌 이후 예약을 취소 할수도 있다. )
    },
  })

  return NextResponse.json(reservation)
}
