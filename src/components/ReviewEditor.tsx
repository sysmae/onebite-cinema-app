import { createReviewAction } from '@/actions/createReviewAction'

const ReviewEditor = ({ movieId }: { movieId: string }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">
        리뷰 작성하기
      </h2>

      <form action={createReviewAction} className="space-y-4">
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
            id="content"
            name="content"
            className="w-full h-40 p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
            placeholder="영화에 대한 솔직한 리뷰를 작성해주세요..."
            required
          ></textarea>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-4">
          <div className="flex-grow mb-4 sm:mb-0">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              작성자
            </label>
            <input
              id="author"
              name="author"
              placeholder="작성자 이름을 입력하세요"
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              type="text"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className={`text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 shadow-sm flex items-center justify-center`}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                리뷰 제출
              </>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReviewEditor
