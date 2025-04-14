import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import { ReviewData } from '@/types'
import ReviewItem from './ReviewItem'

const ReviewList = async ({ movieId }: { movieId: string }) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
    {
      next: {
        tags: [`review-${movieId}`],
      },
    }
  )

  if (!response.ok) {
    throw new Error('리뷰를 가져오는 데 실패했습니다.')
  }
  const reviews: ReviewData[] = await response.json()

  return (
    <div className="space-y-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">
        리뷰 목록
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          아직 작성된 리뷰가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} movieId={movieId} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewList
