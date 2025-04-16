import React, { Suspense } from 'react'
import { MovieData } from '@/types'
import MovieItem from '@/components/MovieItem'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'
import SkeletonList from '@/components/SkeletonList'
import type { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const q = (await searchParams).q || ''

  const title = q ? `"${q}" 검색 결과 | 한입 시네마` : '영화 검색 | 한입 시네마'

  const description = q
    ? `"${q}"에 대한 영화 검색 결과입니다. 한입 시네마에서 다양한 영화 정보를 확인하세요.`
    : '한입 시네마에서 원하는 영화를 검색해보세요. 다양한 장르의 영화 정보를 쉽고 빠르게 찾아볼 수 있습니다.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: q ? `/search?q=${encodeURIComponent(q)}` : '/search',
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
      title,
      description: description.split('.')[0] + '.', // 트위터는 더 짧은 설명이 좋음
      images: ['/thumbnail.png'],
    },
  }
}

async function SearchResult({ q }: { q: string }) {
  if (!q) {
    return (
      <div className="text-center text-gray-500">검색어를 입력해주세요.</div>
    )
  }
  const response = await fetch(
    `${NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: 'force-cache' }
  )

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>
  }

  const filteredMovies: MovieData[] = await response.json()
  if (filteredMovies.length === 0) {
    return <div>등록된 영화가 없습니다.</div>
  }

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">검색 결과: {q}</h1>
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  )
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) => {
  const { q } = await searchParams
  return (
    <Suspense
      key={q || ''}
      fallback={<SkeletonList count={3} cols={3} title="검색 결과" />}
    >
      <SearchResult q={q || ''} />
    </Suspense>
  )
}

export default SearchPage
