import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Modal from '@/components/modals/Modal'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal actionLabel="Submit" isOpen title="hi coco" />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
