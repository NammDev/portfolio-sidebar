import '@/globals.css'

import { draftMode } from 'next/headers'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { EyeIcon } from 'lucide-react'
import SideMenu from '@/components/side-menu'
import { Metadata } from 'next'
import { sharedMetadata } from '@/constants/metadata'
import { PROFILES } from '@/constants'
import { MenuContent } from '@/components/menu-content'
import { preloadGetAllPosts } from '@/lib/contentful'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = draftMode()
  preloadGetAllPosts(isEnabled)

  return (
    <html
      lang='en'
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <main vaul-drawer-wrapper='' className='min-h-screen bg-white'>
          {isEnabled && (
            <div className='absolute inset-x-0 bottom-0 z-50 flex h-12 w-full items-center justify-center bg-green-500 text-center text-sm font-medium text-white'>
              <div className='flex items-center gap-2'>
                <EyeIcon size={16} />
                <span>Draft mode is enabled</span>
              </div>
            </div>
          )}
          <div className='lg:flex'>
            <SideMenu>
              <MenuContent />
            </SideMenu>
            <div className='flex flex-1'>{children}</div>
          </div>
        </main>
        <SpeedInsights />
        {/* <Script
          src='https://unpkg.com/@tinybirdco/flock.js'
          data-host='https://api.tinybird.co'
          data-token={process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}
          strategy='lazyOnload'
        /> */}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-sidebar.vercel.app'),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    default: sharedMetadata.title,
    template: `%s — ${sharedMetadata.title}`,
  },
  description: sharedMetadata.description,
  keywords: ['Nam Khanh Nguyen', 'Nam Nguyen', 'namm dev', 'nammdev.vn'],
  openGraph: {
    title: {
      default: sharedMetadata.title,
      template: `%s — ${sharedMetadata.title}`,
    },
    description: sharedMetadata.description,
    type: 'website',
    url: 'https://portfolio-sidebar.vercel.app',
    siteName: sharedMetadata.title,
    locale: 'en_IE',
  },
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${PROFILES.twitter.username}`,
    creator: `@${PROFILES.twitter.username}`,
  },
  other: {
    pinterest: 'nopin',
  },
}

export const viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
}
