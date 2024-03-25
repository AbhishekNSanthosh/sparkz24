import React from 'react'
import styles from '@styles/scss/profile.module.scss'
import Image from 'next/image'

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topBar}>
          <div className={styles.left}>
            <span className={styles.welcome}>Welcome Abhishek</span>
          </div>
          <div className={styles.right}>
            <button className={styles.logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
