'use client'
import { api } from '@/lib/api'
import React, { FormEvent, useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LoginHome() {
  const [loginError, setLoginError] = useState(false)
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
      setLoginError(true)
      const delay = setTimeout(() => {
        setLoginError(false)
      }, 3000)
      return () => clearTimeout(delay)
    }
  }
  return (
    <main className="flex items-center justify-center min-h-screen">
      <form
        className=" flex flex-col w-[300px] h-[350px] justify-between border-2 border-gray-700 rounded-md p-5 relative"
        onSubmit={submitLogin}
      >
        <label htmlFor="email" className="flex flex-col items-center gap-1">
          <span>Email</span>
          <input
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            className="p-1 rounded-md"
          />
        </label>
        <label htmlFor="password" className="flex flex-col items-center gap-1">
          Password
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            className="p-1 rounded-md"
          />
        </label>
        <button
          className="rounded-full bg-black text-gray-200 hover:bg-gray-800 p-1 w-32 self-center"
          type="submit"
        >
          Entrar
        </button>
        <button
          onClick={() => router.push('/register')}
          className="hover:text-gray-800"
        >
          Criar nova conta
        </button>
        {loginError && (
          <p className="text-red-600 absolute bottom-0 left-1/4">
            Erro ao fazer login
          </p>
        )}
      </form>
    </main>
  )
}
