import EmptyStateButton from './RCC/EmptyStateButton'
import Heading from '../Heading'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

export default function EmptyState({
  title = 'No exact matches',
  subtitle = 'Try changing or removeing some of your filters',
  showReset,
}: EmptyStateProps) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      {showReset && (
        <div className="mt-4 w-48">
          <EmptyStateButton />
        </div>
      )}
    </div>
  )
}
