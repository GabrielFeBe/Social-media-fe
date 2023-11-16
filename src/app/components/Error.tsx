interface Props {
  error?: string
  touched?: boolean
}

export default function Error({ error, touched }: Props) {
  return (
    <>
      {error && touched && (
        <span className="text-red-500 absolute top-14 left-0">{error}</span>
      )}
    </>
  )
}
