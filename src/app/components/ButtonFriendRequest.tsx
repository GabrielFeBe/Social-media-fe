'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
interface Props {
  requesterId: number
  targetId: number
}

export function ButtonFriendRequest({ requesterId, targetId }: Props) {
  const rounter = useRouter()
  return (
    <button
      className="bg-black rounded-full text-gray-300"
      onClick={async () => {
        await api.post('/friends', {
          requesterId,
          targetId,
          status: false,
        })
        rounter.refresh()
      }}
    >
      Send request
    </button>
  )
}
