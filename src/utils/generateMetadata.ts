import { Metadata } from 'next'
import { NEXT_PUBLIC_API_SERVER_URL } from '@/constants'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
      {
        cache: 'force-cache',
      }
    )
    if (!response.ok) throw new Error()
    const movie = await response.json()

    const {
      title,
      subTitle,
      description,
      posterImgUrl,
      releaseDate,
      genres,
      company,
    } = movie

    const fullTitle = subTitle
      ? `${title} - ${subTitle} | 한입 시네마`
      : `${title} | 한입 시네마`
    const desc =
      description ||
      subTitle ||
      `${title}의 상세 정보와 리뷰를 한입 시네마에서 확인하세요.`

    return {
      title: fullTitle,
      description: desc,
      openGraph: {
        title: fullTitle,
        description: desc,
        type: 'article',
        url: `/movie/${params.id}`,
        siteName: '한입 시네마',
        images: [
          {
            url: posterImgUrl || '/thumbnail.png',
            width: 800,
            height: 1200,
            alt: `한입 시네마 - ${title} 포스터`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: desc,
        images: [posterImgUrl || '/thumbnail.png'],
      },
    }
  } catch {
    return {
      title: '영화 정보를 찾을 수 없습니다 | 한입 시네마',
      description: '해당 영화의 상세 정보를 찾을 수 없습니다.',
      openGraph: {
        title: '영화 정보를 찾을 수 없습니다 | 한입 시네마',
        description: '해당 영화의 상세 정보를 찾을 수 없습니다.',
        type: 'article',
        url: '/',
        siteName: '한입 시네마',
        images: [
          {
            url: '/thumbnail.png',
            width: 800,
            height: 1200,
            alt: '한입 시네마 대표 이미지',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: '영화 정보를 찾을 수 없습니다 | 한입 시네마',
        description: '해당 영화의 상세 정보를 찾을 수 없습니다.',
        images: ['/thumbnail.png'],
      },
    }
  }
}
