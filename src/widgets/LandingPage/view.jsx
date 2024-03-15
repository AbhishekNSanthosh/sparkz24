import React from 'react'
import styles from '@styles/scss/landingPage.module.scss'
import Image from 'next/image'
export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <span className={styles.date}>date</span>
        </div>
        <div className={styles.right}>
          <span className={styles.time}>timer</span>
        </div>
        <div className={styles.banner}>
          <Image src="/images/sparkzLogo.svg" height={100} width={100} className={styles.bannerImg}/>
          <div className={styles.titleBox}>
            <span className={styles.title}>SPARKZ'24</span>
            <span className={styles.tagline}>Innovation unleashed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
