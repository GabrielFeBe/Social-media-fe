'use client'
import { FormEvent, useState } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import UserFriend from '@/interfaces/Friend'
import Cookies from 'js-cookie'
import { useEdgeStore } from '@/lib/edgestore'
import { SingleImageDropzone } from '../MeadiaPicker'

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
    <main className="min-h-screen flex justify-center items-center w-full flex-col m-0 p-0">
      <h1 className="text-3xl font-bold text-gray-700 pb-4">Register</h1>
      <form
        className="flex flex-col gap-4  w-[350px] p-4 border-2 border-gray-700 rounded-md h-[720px]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="flex flex-col items-center gap-1">
          <span>Email</span>
          <input
            type="text"
            id="email"
            placeholder="Email"
            name="email"
            className="p-1 rounded-md w-full"
          />
        </label>
        <label htmlFor="password" className="flex flex-col items-center gap-1">
          <span>Password</span>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            className="p-1 rounded-md w-full"
          />
        </label>
        <label htmlFor="name" className="flex flex-col items-center gap-1">
          <span>Name</span>
          <input
            id="name"
            type="text"
            placeholder="Name"
            name="nameAndLastname"
            className="p-1 rounded-md w-full"
          />
        </label>

        <SingleImageDropzone
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          width={'100%' as any}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file)
          }}
          className="bg-black"
        ></SingleImageDropzone>
        <div className="h-2 w-full bg-black border rounded overflow-hidden ">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <textarea
          name="description"
          id=""
          className="resize-none h-[88px] rounded-md"
          placeholder="Put here a description about yourself, things you like to do, places you like to be and etc..."
        ></textarea>
        <label htmlFor="local" className="flex flex-col items-center gap-1">
          <span>Local</span>
          <input
            type="text"
            id="local"
            placeholder="Place that you live"
            name="local"
            className="p-1 rounded-md w-full"
          />
        </label>
        <button className="text-gray-200 bg-black rounded-full hover:bg-gray-800 p-1 w-32 self-center">
          Registrar
        </button>
      </form>
    </main>
  )
}
