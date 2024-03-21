import styles from './App.module.css'
import dev from './assets/dev.gif'

function App() {
  return (
   <div className={styles.container}>
   <span className={styles.title}>SPARKZ'24</span>
   <img src={dev} alt="" />
   </div>
  )
}

export default App
