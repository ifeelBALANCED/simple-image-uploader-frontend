import { Header } from '@/widgets/header'
import { Container } from '@mantine/core'
import { PropsWithChildren } from 'react'

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex items-center justify-center flex-1 overflow-auto p-4">
        <Container className="h-full flex flex-col items-center justify-center">
          {children}
        </Container>
      </main>
    </div>
  )
}
