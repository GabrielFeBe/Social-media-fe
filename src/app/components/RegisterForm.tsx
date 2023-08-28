'use client'
import { Camera } from 'lucide-react'
import MediaPicker from './MeadiaPicker'
import { FormEvent } from 'react'
// import Cookie from 'js-cookie'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const makeForm = new FormData(event.currentTarget)
    // const imageUpload = makeForm.get('coverUrl')
    // let image = ''
    // if(imageUpload){
    // Logica de upload de imagem como ainda não foi feito a rota de imagem no backend não fiz a logica
    // }
    await api.post('/user', {
      email: makeForm.get('email'),
      password: makeForm.get('password'),
      name: makeForm.get('nameAndLastname'),
      description: makeForm.get('description'),
      profilePicture: 'nothingHereTN.jpg',
      local: makeForm.get('local'),
    })
    router.push('/')
  }

  return (
    <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
      <MediaPicker />
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
