'use client'
import { UserById } from '@/interfaces/Friend'
import { useEffect, useState } from 'react'
interface Props {
  user: UserById
}

export default function ClientSideEditing({ user }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [local, setLocal] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setLocal(user.local)
    setDescription(user.description)
  }, [])

  return <form action=""></form>
}
