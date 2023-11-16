'use client'
import { UserById } from '@/interfaces/Friend'
import { useEffect, useState } from 'react'
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
import { Formik } from 'formik'
import * as Yup from 'yup'
import { IRegisterAndEdit } from '@/interfaces/IForm'

interface Props {
  user: UserById
  stringToken: string
}

export default function ClientSideEditing({ user, stringToken }: Props) {
  const [file, setFile] = useState<File | string>()
  const router = useRouter()

  const { edgestore } = useEdgeStore()
  useEffect(() => {
    setFile(user.profilePicture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(data: IRegisterAndEdit) {
    const { description, email, local, name, password } = data
    let profilePicture = file
    if (file && typeof file !== 'string') {
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
        password: password === '' ? undefined : password,
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
    router.refresh()
  }
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-700 pb-4">Edit</h1>
      <Formik
        initialValues={{
          email: user.email,
          password: '',
          name: user.name,
          local: user.local,
          description: user.description,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          local: Yup.string().required('Required'),
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          password: Yup.string().min(8, 'Must be 8 characters or more'),
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
            onSubmit={handleSubmit}
            className="flex flex-col gap-4  w-[350px] p-4 border-2 border-gray-700 rounded-md h-[720px]"
          >
            <Email
              setEmail={handleChange}
              email={values.email}
              Blur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />
            <Password
              setPassword={handleChange}
              password={values.password}
              Blur={handleBlur}
              error={errors.password}
              touched={touched.password}
            />
            <Name
              setName={handleChange}
              name={values.name}
              Blur={handleBlur}
              error={errors.name}
              touched={touched.name}
            />
            <ImageFile setFile={setFile} file={file} />
            <Description
              description={values.description}
              setDescription={handleChange}
              Blur={handleBlur}
              error={errors.description}
              touched={touched.description}
            />
            <Local
              local={values.local}
              setLocal={handleChange}
              Blur={handleBlur}
              error={errors.local}
              touched={touched.local}
            />
            <Button text="Edit" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
    </>
  )
}
