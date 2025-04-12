// ReviewList.tsx
'use client'

import { useState } from 'react'
import { ReviewData } from '@/types'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'

interface ReviewListProps {
  initialReviews: ReviewData[]
  movieId: string
}

const ReviewList = ({ initialReviews, movieId }: ReviewListProps) => {
  const [reviews, setReviews] = useState<ReviewData[]>(initialReviews)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  // 리뷰 삭제 함수
  const handleDelete = async (reviewId: number) => {
    if (!confirm('정말 이 리뷰를 삭제하시겠습니까?')) return

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        // 리뷰 목록에서 삭제된 리뷰 제거
        setReviews(reviews.filter((review) => review.id !== reviewId))
      } else {
        alert('리뷰 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생:', error)
      alert('리뷰 삭제 중 오류가 발생했습니다.')
    }
  }

  // 리뷰 수정 모드 시작
  const startEdit = (review: ReviewData) => {
    setEditingId(review.id)
    setEditContent(review.content)
  }

  // 리뷰 수정 취소
  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
  }

  // 리뷰 수정 제출
  const submitEdit = async (reviewId: number) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: editContent }),
        }
      )

      if (response.ok) {
        const updatedReview = await response.json()
        // 리뷰 목록 업데이트
        setReviews(
          reviews.map((review) =>
            review.id === reviewId ? updatedReview : review
          )
        )
        setEditingId(null)
      } else {
        alert('리뷰 수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('리뷰 수정 중 오류 발생:', error)
      alert('리뷰 수정 중 오류가 발생했습니다.')
    }
  }

  // 리뷰가 없는 경우
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
      </div>
    )
  }

  return (
    <div className="space-y-6 mb-10">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
          {editingId === review.id ? (
            // 수정 모드
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-32 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  취소
                </button>
                <button
                  onClick={() => submitEdit(review.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            // 일반 모드
            <>
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-blue-400">{review.author}</div>
                <div className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-300 whitespace-pre-line">
                {review.content}
              </p>
              <div className="flex justify-end mt-3 space-x-2">
                <button
                  onClick={() => startEdit(review)}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ReviewList
