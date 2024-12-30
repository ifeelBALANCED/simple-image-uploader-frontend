import { imagesModel } from '@/features/images'
import { formatFileSize } from '@/shared/lib/file'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  LoadingOverlay,
  Paper,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconDownload, IconExternalLink, IconMaximize, IconPhoto } from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { useState } from 'react'

const DEFAULT_FALLBACK = 'https://via.placeholder.com/800x600'

export const PreviewPage = () => {
  const { uploadedFile } = useUnit({
    uploadedFile: imagesModel.$uploadedFile,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    if (!uploadedFile?.url) return

    try {
      setIsLoading(true)
      const response = await fetch(uploadedFile.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = uploadedFile.originalName || 'download'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openFullscreen = () => {
    if (uploadedFile?.url) {
      window.open(uploadedFile.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Container size="lg" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Group justify="space-between" mb="xl">
          <Group>
            <IconPhoto size={32} style={{ color: 'var(--mantine-color-blue-6)' }} />
            <div>
              <Title order={2} size="h3" lineClamp={1}>
                {uploadedFile?.originalName || 'Image Preview'}
              </Title>
              <Group gap="xs">
                {uploadedFile?.size && (
                  <Badge size="sm" variant="light">
                    {formatFileSize(uploadedFile.size)}
                  </Badge>
                )}
                {uploadedFile?.created_at && (
                  <Text size="sm" c="dimmed">
                    Uploaded: {new Date(uploadedFile.created_at).toLocaleDateString()}
                  </Text>
                )}
              </Group>
            </div>
          </Group>

          <Group>
            <Tooltip label="View fullscreen">
              <ActionIcon
                variant="light"
                size="lg"
                onClick={openFullscreen}
                disabled={!uploadedFile?.url}
              >
                <IconMaximize size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Card padding="xs" radius="md" withBorder>
          <div style={{ position: 'relative' }}>
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <Image
              src={uploadedFile?.url || DEFAULT_FALLBACK}
              alt={uploadedFile?.originalName || 'Preview'}
              radius="md"
              fit="contain"
              h={500}
              fallbackSrc={DEFAULT_FALLBACK}
            />
          </div>
        </Card>

        <Group mt="xl" justify="center">
          <Button
            size="md"
            leftSection={<IconDownload size={20} />}
            onClick={handleDownload}
            disabled={!uploadedFile?.url || isLoading}
            loading={isLoading}
          >
            Download Image
          </Button>
          <Button
            variant="light"
            size="md"
            leftSection={<IconExternalLink size={20} />}
            component="a"
            href={uploadedFile?.url}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!uploadedFile?.url}
          >
            Open in New Tab
          </Button>
        </Group>
      </Paper>
    </Container>
  )
}
