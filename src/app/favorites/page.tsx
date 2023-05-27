import getCurrentUser from '@/actions/getCurrentUser'
import getFavoriteListings from '@/actions/getFavoriteListings'

import EmptyState from '@/components/EmptyState/EmptyState'
import FavoritesClient from './FavoritesClient'

export default async function FavoritePage() {
  const currentUser = await getCurrentUser()
  const favoriteListings = await getFavoriteListings()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    )
  }

  return (
    <FavoritesClient
      favoriteListings={favoriteListings}
      currentUser={currentUser}
    />
  )
}
