import React from 'react'
import { MovieData } from '@/types'
import MovieItem from '@/components/MovieItem'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) => {
  const { q } = await searchParams

  const response = await fetch(
    `${NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`
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

export default SearchPage
