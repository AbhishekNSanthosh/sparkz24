import React from 'react'
import styles from '@styles/scss/credits.module.scss'

export default function Credits() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <div className={styles.toprow}>
          <span className={styles.clgName}>Carmel College of Engineering & Technology.</span>
          <span className={styles.short}>Punnapra | Alappuzha-688004, Kerala</span>
          <span className={styles.short}>POWERED BY</span>
        </div> */}
        <div className={styles.row}>
          <div className={styles.left}>
            <span className={styles.rights}>All rights reserved®</span>
          </div>
          <div className={styles.center}>
            <button className={styles.button}>Sparkz'24 Website team</button>
          </div>
          <div className={styles.right}>
            <span className={styles.rights}>©2023 - OBCYDIANSCCET</span>
          </div>
        </div>
      </div>
    </div>
  )
}
