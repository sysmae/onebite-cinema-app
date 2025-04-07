import MovieItem from '@/components/MovieItem'
import { MovieData } from '@/types'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'

async function AllMovies() {
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

export default async function Home() {
  return (
    <>
      <RecoMovies />
      <AllMovies />
    </>
  )
}
