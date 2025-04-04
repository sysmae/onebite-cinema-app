import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="text-red-600 text-xl font-bold py-2">
          <Link href="/">ONEBITE CINEMA</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
