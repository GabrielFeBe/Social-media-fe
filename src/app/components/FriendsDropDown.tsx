'use client'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

interface Props {
  children: ReactNode
  title: React.ComponentType
  notification?: number
  setNotification?: Dispatch<SetStateAction<number>>
}

export default function FriendsDropDown({
  children,
  title: Title,
  notification = 0,
  setNotification,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const botaoRef = useRef<HTMLButtonElement & HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        botaoRef.current &&
        !botaoRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={botaoRef} className="relative">
      <button
        className="relative"
        ref={botaoRef}
        onClick={() => {
          setIsVisible(!isVisible)
          if (setNotification) {
            setNotification(0)
          }
        }}
      >
        <Title></Title>

        {notification !== 0 ? (
          <span className="absolute bg-red-700 text-gray-50 text-xs rounded-full w-4 bottom-0 right-0">
            {notification}
          </span>
        ) : null}
      </button>
      {isVisible ? <div className="absolute bg-white">{children}</div> : null}
    </div>
  )
}
