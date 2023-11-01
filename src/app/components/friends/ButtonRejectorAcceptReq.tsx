'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
interface Props {
  id: number
  tokenString: string
}

export function ButtonRejectorAcceptReq({ id, tokenString }: Props) {
  const rounter = useRouter()
  return (
    <>
      <button
        className="bg-black rounded-full text-gray-300"
        onClick={async () => {
          await api.patch(
            `/friends/${id}`,
            {
              status: true,
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
        Accept
      </button>
      <button
        className="bg-black rounded-full text-gray-300"
        onClick={async () => {
          await api.delete(`/friends/${id}`, {
            headers: {
              Authorization: tokenString,
            },
          })
          rounter.refresh()
        }}
      >
        Reject
      </button>
    </>
  )
}
