import { SingleImageDropzone } from '../MeadiaPicker'

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | undefined | string>>
  file: File | undefined | string
}

export default function ImageFile({ setFile, file }: Props) {
  return (
    <SingleImageDropzone
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      width={'100%' as any}
      height={200}
      value={file}
      onChange={(file) => {
        setFile(file)
      }}
      className="bg-black"
    ></SingleImageDropzone>
  )
}
