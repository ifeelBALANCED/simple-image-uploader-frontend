import { App } from '@/app'
import { appStarted } from '@/shared/config'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

appStarted()

root.render(<App />)
