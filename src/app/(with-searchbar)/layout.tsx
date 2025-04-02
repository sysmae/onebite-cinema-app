export default function SearchbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>Searchbar Layout</div>
      {children}
    </div>
  )
}
