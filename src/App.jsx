import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CipherDecryptor from './components/CipherDecryptor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CipherDecryptor />
    </>
  )
}

export default App
