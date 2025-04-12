// 서버 액션 정의
'use server'

import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get('movieId')?.toString() as string
  const content = formData.get('content')?.toString() as string
  const author = formData.get('author')?.toString() as string

  if (!content || !author || !movieId) {
    console.error('모든 필드를 입력해주세요.')
    return
  }

  const reviewData = {
    movieId,
    content,
    author,
  }
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    if (!response.ok) {
      console.error('리뷰 작성 중 오류 발생:', await response.text())
    }
  } catch (error) {
    console.error(
      '리뷰 작성 중 오류 발생:',
      error instanceof Error ? error.message : '알 수 없는 오류'
    )
  }
}
