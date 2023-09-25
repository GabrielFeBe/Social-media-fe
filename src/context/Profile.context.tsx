'use client'
import UserFriend from '@/interfaces/Friend'
import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the type for your context data
type MyContextData = {
  data: UserFriend | null
  addData: (item: UserFriend) => void
}

// Create a context
const MyContext = createContext<MyContextData | undefined>(undefined)

// Create a context provider component
type MyContextProviderProps = {
  children: ReactNode
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<UserFriend | null>(null)

  const addData = (item: UserFriend) => {
    setData(item)
  }

  return (
    <MyContext.Provider value={{ data, addData }}>
      {children}
    </MyContext.Provider>
  )
}

// Create a custom hook to use the context
export const useMyContext = (): MyContextData => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider')
  }
  return context
}
