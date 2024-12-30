import { uploadFileQuery } from '@/entities/images'
import { UploadForm } from '@/features/images'
import {
  Container,
  Group,
  List,
  Loader,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  rem,
} from '@mantine/core'
import { IconCloudUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { useState } from 'react'

const ACCEPTED_FILE_TYPES = {
  'image/jpeg': '.jpg, .jpeg',
  'image/png': '.png',
  'image/gif': '.gif',
}

export const UploadPage = () => {
  const { isFileUploading } = useUnit({
    isFileUploading: uploadFileQuery.$pending,
  })
  const [uploadProgress, setUploadProgress] = useState(0)

  // Simulate upload progress
  if (isFileUploading && uploadProgress < 100) {
    setTimeout(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 100))
    }, 300)
  }

  return (
    <Container size="md" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Stack gap="lg">
          <Group justify="center">
            <ThemeIcon size={54} radius="md" variant="light" color="blue">
              <IconCloudUpload style={{ width: rem(34), height: rem(34) }} />
            </ThemeIcon>
          </Group>

          <Stack gap="xs" align="center">
            <Title order={1} size="h2">
              Upload Image
            </Title>
            <Text c="dimmed" ta="center" maw={400}>
              Share your images securely. We support various formats for your convenience.
            </Text>
          </Stack>

          {isFileUploading ? (
            <Paper withBorder p="md" radius="md">
              <Stack gap="md">
                <Group p="apart">
                  <Group>
                    <IconPhoto size="1.5rem" style={{ color: 'var(--mantine-color-blue-6)' }} />
                    <div>
                      <Text size="sm" fw={500}>
                        Uploading your image
                      </Text>
                      <Text size="xs" c="dimmed">
                        Please wait while we process your file
                      </Text>
                    </div>
                  </Group>
                  <Loader size="sm" />
                </Group>

                <Stack gap="xs">
                  <Progress value={uploadProgress} size="sm" radius="xl" animated striped />
                  <Text size="xs" c="dimmed" ta="center">
                    {uploadProgress}% complete
                  </Text>
                </Stack>
              </Stack>
            </Paper>
          ) : (
            <Stack gap="xl">
              <UploadForm />

              <Stack gap="xs">
                <Text size="sm" fw={500} c="dimmed">
                  File requirements:
                </Text>
                <List
                  size="sm"
                  spacing="xs"
                  icon={
                    <ThemeIcon color="gray" size={20} radius="xl">
                      <IconX size="0.8rem" />
                    </ThemeIcon>
                  }
                >
                  <List.Item>Maximum file size: 5MB</List.Item>
                  <List.Item>
                    Supported formats: {Object.values(ACCEPTED_FILE_TYPES).join(', ')}
                  </List.Item>
                  <List.Item>Clear, non-corrupted files</List.Item>
                </List>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}
