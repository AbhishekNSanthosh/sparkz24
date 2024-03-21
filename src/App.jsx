import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.css'
import dev from './assets/dev.gif'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className={styles.container}>
   <span className={styles.title}>SPARKZ'24</span>
   <img src={dev} alt="" />
   </div>
  )
}

export default App
