import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import ToasterProvider from '@/providers/ToasterProvider'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from '@/actions/getCurrentUser'

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
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currenUser} />
        {/* client component */}

        {children}
      </body>
    </html>
  )
}
