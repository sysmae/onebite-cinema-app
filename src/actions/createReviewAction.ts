// 서버 액션 정의
'use server'

import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import { revalidatePath, revalidateTag } from 'next/cache'
import { delay } from '@/utils/delay'

export async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get('movieId')?.toString() as string
  const content = formData.get('content')?.toString() as string
  const author = formData.get('author')?.toString() as string

  if (!content || !author || !movieId) {
    return {
      status: false,
      error: '모든 필드를 입력해주세요.',
    }
  }

  const reviewData = {
    movieId,
    content,
    author,
  }
  try {
    // 1초간 지연
    await delay(1000)
    const response = await fetch(`${NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
    if (!response.ok) {
      return {
        status: false,
        error: '리뷰 작성 중 오류 발생',
      }
    }
    // // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/movie/${movieId}`)

    // // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/movie/[id]', 'page')

    // // 3. 특정 레이아웃을 가진 모든 페이지를 재검증
    // revalidatePath('/(with-searchbar)', 'layout')

    // // 4. 모든 데이터를 재검증 (비효율적이므로 사용 지양)
    // revalidatePath('/', 'layout')

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${movieId}`)
    return {
      status: true,
      error: '',
    }
  } catch (error) {
    return {
      status: false,
      error: '리뷰 작성 중 오류 발생',
    }
  }
}
