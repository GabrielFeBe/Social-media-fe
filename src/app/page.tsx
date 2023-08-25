import LoginHome from '@/components/LoginHome'
import { getUser } from '@/lib/auth'
import { UserIDJwtPayload } from 'jsonwebtoken'

export default function Home() {
  let token: null | UserIDJwtPayload = null
  try {
    token = getUser()
  } catch (err) {
    token = null
  }

  return (
    <main className="min-h-screen w-full flex flex-1 bg-gray-400 justify-center items-baseline">
      {token ? <>teste</> : <LoginHome />}
    </main>
  )
}
