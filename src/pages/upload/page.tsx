import { Button, Group, Text, Title } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { useState } from 'react'

export const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleDrop = (droppedFiles: File[]) => {
    const file = droppedFiles[0]

    if (file) {
      const allowedTypes = [MIME_TYPES.png, MIME_TYPES.jpeg, 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Only JPG, PNG, and GIF files are allowed.')
        setFiles([])
        return
      }

      const maxSizeInBytes = 2 * 1024 * 1024
      if (file.size > maxSizeInBytes) {
        setError('File size exceeds 2MB. Please upload a smaller file.')
        setFiles([])
        return
      }

      setError(null)
      setFiles([file])
    }
  }

  const handleUpload = () => {
    if (files.length > 0) {
      console.log('Uploading file:', files[0])
      // Handle upload logic
    }
  }

  return (
    <>
      <Title className="text-3xl font-bold">Upload Image</Title>
      <Text className="mt-2 text-gray-600 text-center">
        Drag and drop a JPG, PNG, or GIF file (max size: 2MB), or click to select one.
      </Text>

      <Dropzone
        onDrop={handleDrop}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, 'image/gif']}
        maxFiles={1}
        className="w-full max-w-3xl mt-6 p-6 border-2 border-dashed rounded-lg bg-white border-gray-300"
      >
        <Text size="sm" className="flex items-center text-gray-600">
          Drag and drop your image here or click to browse.
        </Text>
      </Dropzone>

      {error && (
        <Text c="red" className="mt-4">
          {error}
        </Text>
      )}

      {files.length > 0 && (
        <div className="mt-4 w-full max-w-3xl p-4 rounded-lg bg-gray-100">
          <Text className="text-gray-700">
            Selected File: <span className="font-bold">{files[0].name}</span>
          </Text>
          <Text className="text-gray-500">Size: {(files[0].size / 1024 / 1024).toFixed(2)} MB</Text>
        </div>
      )}

      <Group mt="lg">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleUpload}
          disabled={files.length === 0}
        >
          Upload
        </Button>
      </Group>
    </>
  )
}
