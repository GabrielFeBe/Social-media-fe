'use client'
import { api } from '@/lib/api'
import React, { useState } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Email from '../registerOrEditing/Email'
import Password from '../registerOrEditing/Password'

export default function LoginHome() {
  const [loginError, setLoginError] = useState(false)
  const router = useRouter()
  async function submitLogin({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    try {
      const response = await api.post('/user/login', {
        password,
        email,
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
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Email inválido')
            .required('Email obrigatório'),
          password: Yup.string()
            .min(8, 'Senha muito curta')
            .required('Senha obrigatória'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            submitLogin(values)
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            className=" flex flex-col w-[300px] h-[350px] justify-between border-2 border-gray-700 rounded-md p-5 relative"
            onSubmit={handleSubmit}
          >
            <Email
              Blur={handleBlur}
              email={values.email}
              setEmail={handleChange}
              touched={touched.email}
              error={errors.email}
            />
            <Password
              Blur={handleBlur}
              password={values.password}
              setPassword={handleChange}
              error={errors.password}
              touched={touched.password}
            />
            <button
              className="rounded-full bg-black text-gray-200 hover:bg-gray-800 p-1 w-32 self-center"
              type="submit"
              disabled={isSubmitting}
            >
              Entrar
            </button>
            <Link
              href={'/register'}
              className="hover:text-gray-800 text-center"
            >
              Criar nova conta
            </Link>
            {loginError && (
              <p className="text-red-600 absolute bottom-0 left-1/4">
                Erro ao fazer login
              </p>
            )}
          </form>
        )}
      </Formik>
    </main>
  )
}
