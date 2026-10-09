import { VideoProvider } from './components/VideoContext'
import Layout from './components/Layout'

export default function App() {
  return (
    <VideoProvider>
      <Layout />
    </VideoProvider>
  )
}
