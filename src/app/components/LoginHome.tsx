'use client'
import { api } from '@/lib/api'
import React, { FormEvent } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LoginHome() {
  const router = useRouter()
  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      const response = await api.post('/user/login', {
        password: formData.get('password'),
        email: formData.get('email'),
      })
      const { token } = response.data
      Cookie.set('token', token)
      router.refresh()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form className=" flex flex-col w-[300px]" onSubmit={submitLogin}>
      <input type="text" placeholder="Email" name="email" />
      <input type="text" placeholder="Senha" name="password" />
      <button
        className="rounded-full bg-black text-gray-200 w-full"
        type="submit"
      >
        Entrar
      </button>
      <button onClick={() => router.push('/register')}>Criar nova conta</button>
    </form>
  )
}
