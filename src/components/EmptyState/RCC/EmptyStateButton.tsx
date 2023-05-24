'use client'

import { useRouter } from 'next/navigation'
import Button from '../../Button/Button'

export default function EmptyStateButton() {
  const router = useRouter()
  return (
    <Button
      outline
      label="Remove all filters"
      onClick={() => router.push('/')}
    />
  )
}
