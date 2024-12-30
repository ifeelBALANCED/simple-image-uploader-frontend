import { getImagesListQuery } from '@/entities/images'
import { formatFileSize } from '@/shared/lib/file'
import {
  ActionIcon,
  Badge,
  Card,
  Container,
  Group,
  Image,
  List,
  Loader,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import {
  IconDotsVertical,
  IconDownload,
  IconExternalLink,
  IconEye,
  IconPhoto,
} from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { $uploadedFiles } from './model'

export const ImagesPage = () => {
  const { isFilesPending, uploadedFiles } = useUnit({
    isFilesPending: getImagesListQuery.$pending,
    uploadedFiles: $uploadedFiles,
  })

  const handleDownload = async (file: (typeof uploadedFiles)[number]) => {
    try {
      const response = await fetch(file.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = file.originalName
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <Container size="xl" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Group justify="space-between" mb="xl">
          <Group>
            <IconPhoto size={32} style={{ color: 'var(--mantine-color-blue-6)' }} />
            <Title order={1} size="h2">
              Uploaded Images
            </Title>
          </Group>
        </Group>

        {isFilesPending ? (
          <Stack align="center" mt={50}>
            <Loader size="xl" type="bars" />
            <Text c="dimmed" size="sm">
              Loading your images...
            </Text>
          </Stack>
        ) : (
          <List spacing="md">
            {uploadedFiles.map((file) => (
              <List.Item key={file.id}>
                <Card shadow="sm" padding="md" radius="md" withBorder>
                  <Card.Section mb="md">
                    <Image
                      src={file.url}
                      height={200}
                      alt={file.originalName}
                      fallbackSrc="https://placehold.co/400x200?text=Loading..."
                    />
                  </Card.Section>

                  <Group justify="space-between" align="flex-start">
                    <Text fw={500} size="lg" lineClamp={1} style={{ flex: 1 }}>
                      {file.originalName}
                    </Text>
                    <Menu position="bottom-end" withArrow withinPortal>
                      <Menu.Target>
                        <ActionIcon variant="subtle" size="sm">
                          <IconDotsVertical size="1rem" />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconDownload size="1rem" />}
                          onClick={() => handleDownload(file)}
                        >
                          Download
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconExternalLink size="1rem" />}
                          component="a"
                          href={file.url}
                          target="_blank"
                        >
                          Open in new tab
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  <Stack mt="xs" gap="sm">
                    <Group gap="xs">
                      <Badge size="sm" variant="light">
                        {formatFileSize(file.size)}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        {new Date(file.created_at).toLocaleDateString()}
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <Tooltip label="Preview">
                        <ActionIcon variant="light" component="a" href={file.url} target="_blank">
                          <IconEye size="1rem" />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Download">
                        <ActionIcon variant="light" onClick={() => handleDownload(file)}>
                          <IconDownload size="1rem" />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Stack>
                </Card>
              </List.Item>
            ))}
          </List>
        )}

        {!isFilesPending && uploadedFiles.length === 0 && (
          <Stack align="center" mt={50} gap="xs">
            <Text size="lg" fw={500} c="dimmed">
              No images uploaded yet
            </Text>
            <Text size="sm" c="dimmed">
              Upload some images to see them here
            </Text>
          </Stack>
        )}
      </Paper>
    </Container>
  )
}
