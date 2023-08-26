'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
interface Props {
  id: number
}

export function ButtonRejectorAcceptReq({ id }: Props) {
  const rounter = useRouter()
  return (
    <>
      <button
        className="bg-black rounded-full text-gray-300"
        onClick={async () => {
          await api.patch(`/friends/${id}`, {
            status: true,
          })
          rounter.refresh()
        }}
      >
        Accept
      </button>
      <button
        className="bg-black rounded-full text-gray-300"
        onClick={async () => {
          await api.delete(`/friends/${id}`, {})
          rounter.refresh()
        }}
      >
        Reject
      </button>
    </>
  )
}
