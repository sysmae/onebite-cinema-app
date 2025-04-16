'use server'

import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import { revalidateTag } from 'next/cache'

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString() as string
  const movieId = formData.get('movieId')?.toString() as string

  if (!reviewId) {
    return {
      status: false,
      error: '리뷰 ID를 찾을 수 없습니다.',
    }
  }

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: 'DELETE',
      }
    )
    if (!response.ok) {
      return {
        status: false,
        error: '리뷰 삭제 중 오류 발생',
      }
    }

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${movieId}`)
    return {
      status: true,
      error: '',
    }
  } catch (error) {
    return {
      status: false,
      error: '리뷰 삭제 중 오류 발생',
    }
  }
}
