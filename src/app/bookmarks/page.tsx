import { Suspense } from 'react'
import Link from 'next/link'
import { ScrollArea } from '@/components/scroll-area'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { getPageSeo } from '@/lib/contentful'
import { getBookmarks } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'
import { FloatingHeader } from '@/components/floating-header'

async function fetchData() {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks, 'title')
  return { bookmarks: sortedBookmarks }
}

export default async function Bookmarks() {
  const { bookmarks } = await fetchData()

  return (
    <ScrollArea className='lg:hidden'>
      <FloatingHeader title='Bookmarks' bookmarks={bookmarks} />
      <Suspense fallback={<ScreenLoadingSpinner />}>
        {bookmarks?.map((bookmark) => {
          return (
            <Link
              key={bookmark._id}
              href={`/bookmarks/${bookmark.slug}`}
              className='flex flex-col gap-1 border-b px-4 py-3 text-sm hover:bg-gray-100'
            >
              <span className='font-medium'>{bookmark.title}</span>
              <span className='text-slate-500'>{bookmark.count} bookmarks</span>
            </Link>
          )
        })}
      </Suspense>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const seoData = await getPageSeo('bookmarks')
  if (!seoData) return {}

  const {
    seo: { title, description },
  } = seoData
  const siteUrl = '/bookmarks'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}
