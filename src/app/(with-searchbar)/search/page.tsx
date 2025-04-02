import React from 'react'

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) => {
  const { q } = await searchParams
  return <div>Search: {q}</div>
}

export default SearchPage
