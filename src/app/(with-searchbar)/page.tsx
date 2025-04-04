import MovieItem from '@/components/MovieItem'
import movies from '@/mock/movies.json'
import { MovieData } from '@/types'

export default function Home() {
  // 추천 영화: 상위 3개만 선택
  const recommendedMovies = movies.slice(0, 3)
  // 전체 영화: 모든 영화
  const allMovies = movies

  return (
    <>
      {/* 추천 영화 섹션 */}
      <section>
        <div className="py-4">
          <h2 className="font-bold">지금 가장 추천하는 영화</h2>
          <div className="grid grid-cols-3 gap-4">
            {recommendedMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </section>
      {/* 전체 영화 섹션 */}
      <section>
        <div className="py-4">
          <h2 className="font-bold">등록된 모든 영화</h2>
          <div className="grid grid-cols-5 gap-4">
            {allMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
