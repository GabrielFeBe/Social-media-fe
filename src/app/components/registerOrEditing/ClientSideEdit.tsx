'use client'
import { UserById } from '@/interfaces/Friend'
import { FormEvent, useEffect, useState } from 'react'
import Description from './Description'
import Email from './Email'
import Password from './Password'
import Name from './Name'
import Local from './Local'
import { useRouter } from 'next/navigation'
import Button from './Button'
import ImageFile from './ImageFile'
import { useEdgeStore } from '@/lib/edgestore'

interface Props {
  user: UserById
  stringToken: string
}

export default function ClientSideEditing({ user, stringToken }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [local, setLocal] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | string>()
  const router = useRouter()

  const { edgestore } = useEdgeStore()

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setLocal(user.local)
    setDescription(user.description)
    setFile(user.profilePicture)
    console.log(user.profilePicture)
  }, [user])
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push('/')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Email setEmail={setEmail} email={email} />
      <Password setPassword={setPassword} password={password} />
      <Name setName={setName} name={name} />
      <ImageFile setFile={setFile} file={file} />
      <Description description={description} setDescription={setDescription} />
      <Local local={local} setLocal={setLocal} />
      <Button text="Edit" />
    </form>
  )
}
