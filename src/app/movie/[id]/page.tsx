import React, { Suspense } from 'react'
import { MovieData, ReviewData } from '@/types'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import ReviewEditor from '@/components/ReviewEditor'
import ReviewList from '@/components/ReviewList'

import { generateMetadata } from '@/utils/generateMetadata'
export { generateMetadata }

export async function generateStaticParams() {
  const response = await fetch(`${NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: 'force-cache',
  })

  if (!response.ok) {
    throw new Error('영화 데이터를 가져오는 데 실패했습니다.')
  }

  const movies: MovieData[] = await response.json()

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }))
}

// 영화 상세 정보 컴포넌트
const MovieDetail = async ({ id }: { id: string }) => {
  const response = await fetch(`${NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`, {
    cache: 'force-cache',
    next: { tags: [`movie-${id}`] },
  })

  if (!response.ok) {
    return <div className="text-center text-gray-500">오류가 발생했습니다.</div>
  }
  const movie: MovieData = await response.json()

  if (!movie) {
    return (
      <div className="text-center text-gray-500">
        해당 영화 정보를 찾을 수 없습니다.
      </div>
    )
  }

  // 구조분해 할당으로 영화 정보 추출
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie

  return (
    <div className="bg-black text-white">
      {/* 영화 정보 컨테이너 */}
      <div className="max-w-6xl mx-auto p-4 relative">
        {/* 포스터 섹션 */}
        <div className="relative mb-6">
          {/* 배경 포스터 (흐릿하게) */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-full h-full blur-sm opacity-30"
              style={{
                backgroundImage: `url(${posterImgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
              }}
            ></div>
          </div>

          {/* 메인 포스터 */}
          <div className="flex justify-center items-center py-10 relative z-10">
            <img
              src={posterImgUrl}
              alt={title}
              className="h-96 shadow-2xl"
              style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)' }}
            />
          </div>
        </div>

        {/* 영화 제목 및 기본 정보 */}
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        <div className="text-sm text-gray-400 mb-6">
          {releaseDate} / {genres.join(', ')} / {runtime}분
          <br />
          {company}
        </div>

        {/* 영화 설명 */}
        <div className="mb-8">
          <p className="text-lg font-bold mb-3">{subTitle}</p>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

// 리뷰 섹션 컴포넌트 - 리뷰 목록과 에디터를 포함
const ReviewSection = async ({ movieId }: { movieId: string }) => {
  return (
    <div className="bg-gray-900 ">
      <div className="max-w-4xl mx-auto px-4">
        {/* 리뷰 작성 폼 */}
        <ReviewEditor movieId={movieId} />
        {/* 리뷰 목록 */}
        <ReviewList movieId={movieId} />
      </div>
    </div>
  )
}

// 메인 페이지 컴포넌트
const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  if (!id) {
    return (
      <div className="text-center text-gray-500">
        영화 ID를 찾을 수 없습니다.
      </div>
    )
  }

  return (
    <div>
      <MovieDetail id={id} />
      <Suspense
        fallback={
          <div className="text-center p-8 text-gray-400">리뷰 로딩 중...</div>
        }
      >
        <ReviewSection movieId={id} />
      </Suspense>
    </div>
  )
}

export default MoviePage
