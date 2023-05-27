import EmptyState from '@/components/EmptyState/EmptyState'

import getCurrentUser from '@/actions/getCurrentUser'
import getListings from '@/actions/getListings'

import PropertiesClient from './PropertiesClient'

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser()
  const listings = await getListings({ userId: currentUser?.id })

  if (!currentUser) {
    return <EmptyState title="unauthorized" subtitle="Please login" />
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle={`Looks like you haven't any properties`}
      />
    )
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />
}
