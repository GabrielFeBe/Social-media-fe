'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
interface Props {
  requesterId: number
  targetId: number
  tokenString: string
}

export function ButtonFriendRequest({
  requesterId,
  targetId,
  tokenString,
}: Props) {
  const rounter = useRouter()
  return (
    <button
      className="bg-black rounded-full text-gray-300"
      onClick={async () => {
        await api.post(
          '/friends',
          {
            requesterId,
            targetId,
            status: false,
          },
          {
            headers: {
              Authorization: tokenString,
            },
          },
        )
        rounter.refresh()
      }}
    >
      Send request
    </button>
  )
}
