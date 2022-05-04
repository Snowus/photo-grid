import { useEffect } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import ScrollComponent from './components/InfiniteScrolling'

const App = () => (
  <>
    <Header />
    {/* <Home /> */}
    <ScrollComponent/>
  </>
)

export default App
