interface Props {
  text: string
  disabled?: boolean
}

export default function Button({ text, disabled = false }: Props) {
  return (
    <button
      className="text-gray-200 bg-black rounded-full hover:bg-gray-800 p-1 w-32 self-center"
      disabled={disabled}
    >
      {text}
    </button>
  )
}
