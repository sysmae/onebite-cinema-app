'use client'
import { createReviewAction } from '@/actions/createReviewAction'
import { useActionState, useEffect } from 'react'

const ReviewEditor = ({ movieId }: { movieId: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  )

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error)
    }
  }, [state])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">
        리뷰 작성하기
      </h2>

      <form action={formAction} className="space-y-4">
        {/* 이렇게 하면 보이지 않아도 id 넘겨줄 수 있음 */}
        <input type="hidden" name="movieId" value={movieId} hidden readOnly />
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            리뷰 내용
          </label>
          <textarea
            disabled={isPending}
            id="content"
            name="content"
            className="w-full h-40 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
            placeholder="영화에 대한 솔직한 리뷰를 작성해주세요..."
            required
          ></textarea>
        </div>

        <div className="sm:flex sm:items-end sm:justify-between sm:space-x-4">
          <div className="flex-grow mb-4 sm:mb-0">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              작성자
            </label>
            <input
              disabled={isPending}
              id="author"
              name="author"
              placeholder="작성자 이름을 입력하세요"
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              type="text"
              required
            />
          </div>

          <div className="flex-shrink-0 self-end">
            <button
              disabled={isPending}
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 shadow-sm flex items-center justify-center gap-2 ${
                isPending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>리뷰 작성 중...</span>
                </>
              ) : (
                <span>리뷰 작성하기</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReviewEditor
