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
import { api } from '@/lib/api'

interface Props {
  user: UserById
  stringToken: string
}

export default function ClientSideEditing({ user, stringToken }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<string>()
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
    let profilePicture = typeof file === 'string' ? file : ''
    if (typeof file !== 'string' && file) {
      const resImg = await edgestore.publicFiles.upload({
        file,
        // onProgressChange: (progress) => {
        //   setProgress(progress)
        // },
        options: {},
      })
      profilePicture = resImg.url
    }
    await api.patch(
      `/user/${user.id}`,
      {
        name,
        email,
        password,
        local,
        description,
        profilePicture,
      },
      {
        headers: {
          Authorization: stringToken,
        },
      },
    )
    router.push('/')
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-700 pb-4">Edit</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  w-[350px] p-4 border-2 border-gray-700 rounded-md h-[720px]"
      >
        <Email setEmail={setEmail} email={email} />
        <Password setPassword={setPassword} password={password} />
        <Name setName={setName} name={name} />
        <ImageFile setFile={setFile} file={file} />
        <Description
          description={description}
          setDescription={setDescription}
        />
        <Local local={local} setLocal={setLocal} />
        <Button text="Edit" />
      </form>
    </>
  )
}