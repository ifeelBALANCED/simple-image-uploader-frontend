import { Container } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { Header } from '@/widgets/header'

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="overflow-hidden p-2">
        <Container className="flex flex-col items-center justify-center h-[calc(100vh_-_124px)] p-6">
          {children}
        </Container>
      </main>
    </div>
  )
}
