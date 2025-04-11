import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../src/components/auth/Login'
import { BrowserRouter } from 'react-router-dom' // Ajouté pour le routage

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter> {/* Enveloppez avec BrowserRouter si vous utilisez react-router */}
      <div className="app-container">
        {/* Vos autres éléments */}
        <Login />
      </div>
    </BrowserRouter>
  )
}

export default App