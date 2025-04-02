export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>Search Layout</div>
      {children}
    </div>
  )
}
