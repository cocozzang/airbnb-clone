import EmptyState from '@/components/EmptyState/EmptyState'

import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import TripsClient from './TripsClient'

export default async function TripsPage() {
  const currentUser = await getCurrentUser()
  const reservations = await getReservations({ userId: currentUser?.id })

  if (!currentUser) {
    return <EmptyState title="unauthorized" subtitle="Please login" />
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle={`Looks like you haven't any trips`}
      />
    )
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />
}
