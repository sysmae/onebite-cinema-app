import { ReviewData } from '@/types'
import ReviewItemDeleteButton from './ReviewItemDeleteButton'

const ReviewItem = ({
  review,
  movieId,
}: {
  review: ReviewData
  movieId: string
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-5 shadow-md hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-300">{review.author}</span>
          <span className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
        <ReviewItemDeleteButton
          reviewId={review.id.toString()}
          movieId={movieId}
        />
      </div>
      <p className="text-gray-300 leading-relaxed">{review.content}</p>
    </div>
  )
}

export default ReviewItem
