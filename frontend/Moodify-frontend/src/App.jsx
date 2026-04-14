import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import { SongContextProvider } from './Features/song/Song.Context'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="app-shell">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>

      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </div>
  )
}

export default App
