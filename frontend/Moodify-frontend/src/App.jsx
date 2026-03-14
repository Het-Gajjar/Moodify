

import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import { SongContextProvider } from './Features/song/Song.Context'

function App() {


  return (
    <>
    <SongContextProvider>
    <RouterProvider router={router}/>
    </SongContextProvider>
    </>
  )
}

export default App
