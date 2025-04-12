'use client'

import { useRouter } from 'next/navigation'
import { startTransition, useEffect } from 'react'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter()
  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])
  return (
    <div>
      <h3 className="text-2xl">오류가 발생했습니다.</h3>
      {/* <p>{error.message}</p> */}
      <p>잠시 후 다시 시도해주세요.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        onClick={() => {
          startTransition(() => {
            router.refresh() // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
            reset() // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          })
        }}
      >
        다시 시도하기
      </button>
      <p className="text-gray-500">
        오류가 계속 발생하면 관리자에게 문의해주세요.
      </p>
    </div>
  )
}

export default Error
