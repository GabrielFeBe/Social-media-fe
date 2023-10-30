'use client'
import { Camera } from 'lucide-react'
import { FormEvent, useState } from 'react'
// import Cookie from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import UserFriend from '@/interfaces/Friend'
import Cookies from 'js-cookie'
import { useEdgeStore } from '@/lib/edgestore'
import { SingleImageDropzone } from './MeadiaPicker'

interface userCreated {
  userCreated: Partial<UserFriend>
}

export default function RegisterForm() {
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const { edgestore } = useEdgeStore()
  const router = useRouter()
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const makeForm = new FormData(event.currentTarget)
    let imageString = ''
    if (file) {
      const resImg = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress)
        },
        options: {},
      })
      imageString = resImg.url
    }
    const response = await api.post('/user', {
      email: makeForm.get('email'),
      password: makeForm.get('password'),
      name: makeForm.get('nameAndLastname'),
      description: makeForm.get('description'),
      profilePicture: imageString,
      local: makeForm.get('local'),
    })
    const user: userCreated = response.data
    Cookies.set('token', user.userCreated.token as string)
    router.push('/')
  }

  return (
    <form
      action=""
      className="flex flex-col gap-4 pt-10"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="media"
        className="flex cursor-pointer items-center gap-1.5 text-sm "
      >
        <Camera className="h-4 w-4"></Camera>
        Anexar mídia
      </label>
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input
        type="text"
        placeholder="Name and Lastname"
        name="nameAndLastname"
      />
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file)
        }}
        className="bg-black"
      ></SingleImageDropzone>
      <div className="h-2 w-96 bg-black border rounded overflow-hidden ">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <textarea
        name="description"
        id=""
        className="resize-none"
        placeholder="Put here a description about yourself, things you like to do, places you like to be and etc..."
      ></textarea>
      <input type="text" placeholder="Place that you live" name="local" />
      <button className="text-gray-200 bg-black rounded-full" type="submit">
        Registrar
      </button>
    </form>
  )
}
