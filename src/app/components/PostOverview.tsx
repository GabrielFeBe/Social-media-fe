'use client'
import { Posts } from '@/interfaces/Posts'
import { useEffect } from 'react'

interface Props {
  post?: Posts
}

export default function PostOverView({ post }: Props) {
  useEffect(() => {
    // ComponentDidMount
    document.body.style.overflow = 'hidden'

    // ComponentWillUnmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <main className="min-h-screen w-full fixed bg-black opacity-30 overflow-hidden top-0 left-0">
      test
    </main>
  )
}
