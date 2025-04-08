import Searchbar from '@/components/Searchbar'
import { Suspense } from 'react'

export default function SearchbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  )
}
