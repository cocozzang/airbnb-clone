'use client'
// react Next
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

// third party
import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'

// UI or icons
import { toast } from 'react-hot-toast'

// hooks
import useLoginModal from '@/hooks/useLoginModal'

// components
import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'
import ListingReservation from '@/components/listings/ListingReservation'

// types
import { SafeListing, SafeReservation, SafeUser } from '@/types'
import { Range } from 'react-date-range'

// data
import { categories } from '@/constants'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  listing: SafeListing & { user: SafeUser }
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

export default function ListingClient({
  listing,
  currentUser,
  reservations = [],
}: ListingClientProps) {
  const router = useRouter()
  const loginModal = useLoginModal()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsloading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsloading(true)
    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!')
        setDateRange(initialDateRange)
        router.push('/trips')
        // TODO: trips으로 이동할 것인지 확인창 뛰우고 이동하기 버튼을 누르면 이동하게 하기!
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
