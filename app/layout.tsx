import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: '次、いつペカる？',
  description:
    'あなたの打っているジャグラーが次いつ当たるのかを超適当に予測します。絶対に信じないでください。',
  keywords: ['ジャグラー', 'GOGOランプ', 'いつ当たる', 'ペカ', '設定'],
  icons: [
    { rel: 'icon', url: '/images/favicon.ico' },
    { rel: 'icon', url: '/images/favicon.svg', type: 'image/svg+xml' },
  ],
  openGraph: {
    title: '次、いつペカる？',
    description:
      'あなたの打っているジャグラーが次いつ当たるのかを超適当に予測します。絶対に信じないでください。',
    images: ['/images/favicon.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '次、いつペカる？',
    description:
      'あなたの打っているジャグラーが次いつ当たるのかを超適当に予測します。絶対に信じないでください。',
    images: ['/images/favicon.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
