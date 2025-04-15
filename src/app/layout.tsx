import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="text-red-600 text-xl font-bold py-2">
          <Link href="/">ONEBITE CINEMA</Link>
        </header>
        <main>{children}</main>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
