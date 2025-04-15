import Link from 'next/link'
import React, { ReactNode } from 'react'

const Layout = ({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode
  sidebar: ReactNode
  feed: ReactNode
}) => {
  return (
    <div>
      <div>
        <Link href="/parallel">Parallel</Link>
        <br />
        {/* 처음 링크로 들어가면 이전 것으로 가져오지만 새로고침하면 404 -> default.tsx */}
        <Link href="/parallel/setting">parallel/setting</Link>
      </div>
      <div>{sidebar}</div>
      <div>{feed}</div>
      <div>{children}</div>
    </div>
  )
}
export default Layout
