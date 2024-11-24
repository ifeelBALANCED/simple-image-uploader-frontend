import { Button, Group, Image, Text, Title } from '@mantine/core'

export const PreviewPage = () => {
  const imageUrl = 'https://via.placeholder.com/800x600'
  const imageTitle = 'Sample Image Title'
  const imageDescription = 'This is a sample description of the image.'

  return (
    <>
      <Title className="text-3xl font-bold text-gray-800">{imageTitle}</Title>
      <Text className="mt-2 text-gray-600 text-center">{imageDescription}</Text>
      <div className="w-full max-w-4xl mt-6">
        <Image
          src={imageUrl}
          alt={imageTitle}
          className="rounded-lg shadow-lg border border-gray-200"
          radius="md"
        />
      </div>
      <Group mt="lg">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => window.open(imageUrl, '_blank')}
        >
          Download
        </Button>
      </Group>
    </>
  )
}
