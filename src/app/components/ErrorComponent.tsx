import React from 'react'

export default function ErrorComponent({ errorText }: { errorText: string }) {
  return (
    <div className="flex min-h-screen justify-center items-center w-full">
      <h2 className="text-red-500 text-2xl font-bold">{errorText}</h2>
    </div>
  )
}
