import './globals.css'

import { Nunito } from 'next/font/google'

import ToasterProvider from '@/providers/ToasterProvider'
import getCurrentUser from '@/actions/getCurrentUser'

import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/x-icon',
    },
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currenUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        {/* client component */}
        <ToasterProvider />
        <SearchModal />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        {/* client component */}
        <Navbar currentUser={currenUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
