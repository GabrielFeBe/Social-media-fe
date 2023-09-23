import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getUser } from '@/lib/auth'
import { cookies } from 'next/headers'
import { UserIDJwtPayload } from 'jsonwebtoken'
import FriendsRequest from './components/FriendsRequest'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let token: null | UserIDJwtPayload = null
  try {
    token = getUser()
  } catch (err) {
    token = null
  }
  const stringToken = cookies().get('token')?.value

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {/* @ts-expect-error next new feature */}
          <FriendsRequest token={token} tokenString={stringToken} />
        </header>

        {children}
        <footer className="w-full h-[200px] bg-gray-500">
          <div className="flex flex-1 justify-between items-center pt-10 w-1/2 m-auto">
            <a
              href="https://www.instagram.com/"
              className="h-10 w-10  bg-[url('../assets/ig.svg')] bg-cover block  hover:scale-hover-grow transition-transform"
            ></a>
            <a
              href="https://github.com/GabrielFeBe"
              className="h-10 w-10  bg-[url('../assets/github.svg')] bg-cover block  hover:scale-hover-grow transition-transform"
            ></a>
            <a
              href="https://www.linkedin.com/in/gabriel-fernandes-453813264/"
              className="h-10 w-10  bg-[url('../assets/linkedin.svg')] bg-cover block  hover:scale-hover-grow transition-transform"
            ></a>
          </div>

          <p className="m-auto w-1/2 text-center pt-10">
            © Copyright Social-G 2023
          </p>
        </footer>
      </body>
    </html>
  )
}
