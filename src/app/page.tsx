import getCurrentUser from '@/actions/getCurrentUser'
import getListings, { IListingsParams } from '@/actions/getListings'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState/EmptyState'
import ListingCard from '@/components/listings/ListingCard'

// Error: Dynamic server usage: searchParams.userId
export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
// https://github.com/vercel/next.js/issues/49182
// https://github.com/AntonioErdeljac/next13-airbnb-clone/issues/12
interface HomeProps {
  searchParams: IListingsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </Container>
  )
}
