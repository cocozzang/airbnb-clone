import getCurrentUser from '@/actions/getCurrentUser'
import getListingsById, {
  getListingsByIdParams,
} from '@/actions/getListingById'
import getReservations from '@/actions/getReservations'

import EmptyState from '@/components/EmptyState/EmptyState'
import ListingClient from './ListingClient'

export default async function ListingPage({
  params,
}: {
  params: getListingsByIdParams
}) {
  const listing = await getListingsById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  )
}
