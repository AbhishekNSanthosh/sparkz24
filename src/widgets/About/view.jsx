import React from 'react'
import styles from '@styles/scss/about.module.scss'
import Image from 'next/image'
export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topRow}>
          <span className={styles.aboutTitle}>ABOUT US</span>
        </div>
        <div className={styles.row}>
          <div className={styles.left}>
            <p className={styles.para}>From a humble beginning four years ago, Sparkz, the annual national-level technical festival of Carmel College of Engineering and Technology Punnapra, has grown into an event that brings out the multitudes of talents and skills hidden in students. It is an attempt to challenge new possibilities, inspire innovation and a platform to showcase and hone our technical talents and skills. As part of Sparkz, several technical and non-technical events are conducted for participants over the two days. A greater focus is placed on the technical events conducted by all four branches. This year events for the school students are also organized to support and encourage budding talents. Participants from various colleges and schools are invited to participate and win the attractive prizes</p>
          </div>
          <div className={styles.right}>
            <Image src="/images/carmel.png" height={500} width={500} className={styles.logo} />
          </div>
        </div>
      </div>
    </div>
  )
}
