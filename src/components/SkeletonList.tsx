import React from 'react'

const MovieItemSkeleton = () => {
  return (
    <div className="relative w-full aspect-[3/5] overflow-hidden shadow-sm">
      <div className="absolute inset-0 bg-gray-300/70 animate-pulse"></div>
    </div>
  )
}

const SkeletonList = ({ count = 5, cols = 5, title = '' }) => {
  return (
    <section>
      <div className="flex flex-col">
        {title && <h2 className="font-bold">{title}</h2>}
        <div className={`grid grid-cols-${cols} gap-x-6`}>
          {Array.from({ length: count }).map((_, index) => (
            <MovieItemSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkeletonList
