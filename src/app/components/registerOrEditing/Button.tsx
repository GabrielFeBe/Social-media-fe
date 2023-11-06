export default function Button({ text }: { text: string }) {
  return (
    <button className="text-gray-200 bg-black rounded-full hover:bg-gray-800 p-1 w-32 self-center">
      {text}
    </button>
  )
}
