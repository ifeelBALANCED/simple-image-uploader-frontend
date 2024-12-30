import { imagesModel } from '@/features/images'
import { Button, Group, Text } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { useForm } from 'effector-forms'
import { FormEventHandler } from 'react'

const ALLOWED_IMAGE_TYPES: string[] = [
  MIME_TYPES.jpeg,
  MIME_TYPES.png,
  MIME_TYPES.gif,
  MIME_TYPES.webp,
  MIME_TYPES.svg,
  'image/tiff',
  'image/bmp',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024

export const UploadForm = () => {
  const { fields, submit } = useForm(imagesModel.uploadFileForm)

  const handleDrop = (droppedFiles: File[]) => {
    const file = droppedFiles[0]

    if (file && ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
      fields.file.onChange(file)
    } else {
      fields.file.onChange(null)
    }
  }

  const handleUpload: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    submit()
  }
  return (
    <form onSubmit={handleUpload} noValidate>
      <Dropzone
        onDrop={handleDrop}
        accept={ALLOWED_IMAGE_TYPES}
        maxFiles={1}
        className="w-full max-w-3xl mt-6 p-6 border-2 border-dashed rounded-lg bg-white border-gray-300"
      >
        <Text size="sm" className="flex items-center text-gray-600">
          Drag and drop your image here or click to browse.
        </Text>
      </Dropzone>

      {fields.file.value && (
        <div className="mt-4 w-full max-w-3xl p-4 rounded-lg bg-gray-100">
          <Text className="text-gray-700">
            Selected File: <span className="font-bold">{fields.file.value.name}</span>
          </Text>
          <Text className="text-gray-500">
            Size: {(fields.file.value.size / 1024 / 1024).toFixed(2)} MB
          </Text>
        </div>
      )}

      <Group mt="lg">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          type="submit"
          disabled={!fields.file.value}
        >
          Upload
        </Button>
      </Group>
    </form>
  )
}
