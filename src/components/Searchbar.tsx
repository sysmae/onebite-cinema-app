'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  // 쿼리 스트링에서 초기값 설정
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
  }, [searchParams])

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-2 my-5">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요"
        className="flex-1 px-3 py-2 text-base text-white bg-transparent border border-gray-500 rounded"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-red-600"
      >
        검색
      </button>
    </div>
  )
}
