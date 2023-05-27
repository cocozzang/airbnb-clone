import useCountries from '@/hooks/useCountries'
import { SafeUser } from '@/types'
import Image from 'next/image'
import HeartButton from '../Button/HeartButton'
import Heading from '../Heading'

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

export default function ListingHead({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="Listing Image"
          src={imageSrc}
          fill
          className="w-full object-fill"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
