'use client'

import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import { SafeFavorite, SafeUser } from '@/types'

interface FavoritesClientProps {
  favoriteListings: SafeFavorite[]
  currentUser?: SafeUser | null
}

export default function FavoritesClient({
  favoriteListings,
  currentUser,
}: FavoritesClientProps) {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="Listing of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favoriteListings.map((favoriteListing) => (
          <ListingCard
            key={favoriteListing.id}
            currentUser={currentUser}
            data={favoriteListing}
          />
        ))}
      </div>
    </Container>
  )
}
