import MovieItem from '@/components/MovieItem'
import { MovieData } from '@/types'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import { delay } from '@/utils/delay'
import { Suspense } from 'react'
import SkeletonList from '@/components/SkeletonList'
import { Metadata } from 'next'

async function AllMovies() {
  await delay(1500)
  const response = await fetch(`${NEXT_PUBLIC_API_SERVER_URL}/movie`, {
    cache: 'force-cache',
    next: { revalidate: 60 * 5 }, // 5분마다 갱신
  })
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>
  }
  const allMovies: MovieData[] = await response.json()
  if (allMovies.length === 0) {
    return <div>등록된 영화가 없습니다.</div>
  }
  return (
    <section>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">등록된 모든 영화</h2>
        <div className="grid grid-cols-5 gap-4">
          {allMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

async function RecoMovies() {
  await delay(3000)
  const response = await fetch(`${NEXT_PUBLIC_API_SERVER_URL}/movie/random`, {
    cache: 'force-cache',
    next: { revalidate: 60 * 60 * 24 }, // 1일 마다 갱신,
  })
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>
  }
  const recoMovies: MovieData[] = await response.json()
  if (recoMovies.length === 0) {
    return <div>추천 영화가 없습니다.</div>
  }

  return (
    <section>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">추천 영화</h2>
        <div className="grid grid-cols-3 gap-4">
          {recoMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

export const dynamic = 'force-dynamic' // 페이지가 동적 생성되도록 설정

export const metadata: Metadata = {
  title: '한입 시네마 | 모든 영화와 추천 영화',
  description:
    '한입 시네마에서 추천 영화와 최신 영화 정보를 한눈에 확인하세요. 다양한 장르의 영화를 쉽고 빠르게 만나보세요.',
  openGraph: {
    title: '한입 시네마 | 모든 영화와 추천 영화',
    description:
      '한입 시네마에서 추천 영화와 최신 영화 정보를 한눈에 확인하세요. 다양한 장르의 영화를 쉽고 빠르게 만나보세요.',
    url: '/',
    siteName: '한입 시네마',
    type: 'website',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: '한입 시네마 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '한입 시네마 | 모든 영화와 추천 영화',
    description:
      '한입 시네마에서 추천 영화와 최신 영화 정보를 한눈에 확인하세요.',
    images: ['/thumbnail.png'],
  },
}

export default async function Home() {
  return (
    <>
      <Suspense
        fallback={<SkeletonList count={3} cols={3} title="추천 영화" />}
      >
        <RecoMovies />
      </Suspense>
      <Suspense
        fallback={<SkeletonList count={5} cols={5} title="등록된 모든 영화" />}
      >
        <AllMovies />
      </Suspense>
    </>
  )
}
