import React from 'react'
import styles from '@styles/scss/loading.module.scss'
import Image from 'next/image'
export default function loading() {
  return (
    <div className={styles.container}>
        <Image alt='loading' src={"/gifs/splashScreen.gif"} height={1000} width={1000}/>
    </div>
  )
}
