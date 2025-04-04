import React from 'react'
import movies from '@/mock/movies.json'
import { MovieData } from '@/types'
import MovieItem from '@/components/MovieItem'

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) => {
  const { q } = await searchParams
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  )
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
