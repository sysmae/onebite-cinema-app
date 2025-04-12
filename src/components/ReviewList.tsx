import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import { ReviewData } from '@/types'

const ReviewList = async ({ movieId }: { movieId: string }) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
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
            <div
              key={review.id}
              className="bg-gray-800 rounded-lg p-5 shadow-md hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-300">
                    {review.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button className="text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-gray-700">
                  삭제
                </button>
              </div>

              <p className="text-gray-300 leading-relaxed">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewList
