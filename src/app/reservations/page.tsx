import EmptyState from '@/components/EmptyState/EmptyState'

import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import ReservationsClient from './ReservationsClient'

export default async function ReservationPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    )
  }

  return (
    <div>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  )
}
