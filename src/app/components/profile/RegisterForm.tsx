'use client'
import { useState } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import UserFriend from '@/interfaces/Friend'
import Cookies from 'js-cookie'
import { useEdgeStore } from '@/lib/edgestore'
import Email from '../registerOrEditing/Email'
import Password from '../registerOrEditing/Password'
import Name from '../registerOrEditing/Name'
import Description from '../registerOrEditing/Description'
import Local from '../registerOrEditing/Local'
import Button from '../registerOrEditing/Button'
import ImageFile from '../registerOrEditing/ImageFile'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { IRegisterAndEdit } from '@/interfaces/IForm'

interface userCreated {
  userCreated: Partial<UserFriend>
}

export default function RegisterForm() {
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState(0)
  const { edgestore } = useEdgeStore()
  const router = useRouter()
  async function handleSubmit(data: IRegisterAndEdit) {
    const { email, local, description, name, password } = data
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
      email,
      password,
      name,
      description,
      profilePicture: imageString,
      local,
    })
    const user: userCreated = response.data
    Cookies.set('token', user.userCreated.token as string)
    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen flex justify-center items-center w-full flex-col m-0 p-0">
      <h1 className="text-3xl font-bold text-gray-700 pb-4">Register</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          description: '',
          local: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          local: Yup.string().required('Required'),
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          password: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmit(values)
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
            className="flex flex-col gap-4  w-[350px] p-4 border-2 border-gray-700 rounded-md h-[720px]"
            onSubmit={handleSubmit}
          >
            <Email
              email={values.email}
              setEmail={handleChange}
              touched={touched.email}
              error={errors.email}
              Blur={handleBlur}
            />
            <Password
              password={values.password}
              setPassword={handleChange}
              error={errors.password}
              touched={touched.password}
              Blur={handleBlur}
            />
            <Name
              name={values.name}
              setName={handleChange}
              error={errors.name}
              touched={touched.name}
              Blur={handleBlur}
            />

            <ImageFile
              setFile={
                setFile as React.Dispatch<
                  React.SetStateAction<File | undefined | string>
                >
              }
              file={file}
            />
            <div className="h-2 w-full bg-black border rounded overflow-hidden ">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <Description
              description={values.description}
              setDescription={handleChange}
              error={errors.description}
              touched={touched.description}
              Blur={handleBlur}
            />
            <Local
              Blur={handleBlur}
              local={values.local}
              setLocal={handleChange}
              error={errors.local}
              touched={touched.local}
            />
            <Button text="Register" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
    </main>
  )
}
