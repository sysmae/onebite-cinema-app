import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        Global Layout
        {children}
      </body>
    </html>
  )
}
