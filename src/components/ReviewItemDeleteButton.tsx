'use client'

import { deleteReviewAction } from '@/actions/deleteReviewAction'
import { useActionState, useRef, useEffect } from 'react'

const ReviewItemDeleteButton = ({
  reviewId,
  movieId,
}: {
  reviewId: string
  movieId: string
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  )

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error)
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-gray-700 cursor-pointer"
    >
      <input type="hidden" name="reviewId" value={reviewId} readOnly />
      <input type="hidden" name="movieId" value={movieId} readOnly />
      <div
        onClick={() => !isPending && formRef.current?.requestSubmit()}
        className={`flex items-center ${
          isPending
            ? 'text-gray-500 cursor-not-allowed opacity-60'
            : 'cursor-pointer'
        }`}
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            삭제 중...
          </>
        ) : (
          '삭제하기'
        )}
      </div>
    </form>
  )
}

export default ReviewItemDeleteButton
