import Searchbar from '@/components/Searchbar'

export default function SearchbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>
        <Searchbar />
      </div>
      {children}
    </div>
  )
}
