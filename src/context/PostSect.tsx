'use client'
import { Posts } from '@/interfaces/Posts'
import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the type for your context data
type MyContextData = {
  posts: Posts | undefined
  addPosts: (item: Posts) => void
}

// Create a context
const MyContext = createContext<MyContextData | undefined>(undefined)

// Create a context provider component
type MyContextProviderProps = {
  children: ReactNode
}

export const MyContextProviderPosts: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Posts>()

  const addPosts = (item: Posts | undefined) => {
    setPosts(item)
  }

  return (
    <MyContext.Provider value={{ posts, addPosts }}>
      {children}
    </MyContext.Provider>
  )
}

// Create a custom hook to use the context
export const useMyPostContext = (): MyContextData => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider')
  }
  return context
}
