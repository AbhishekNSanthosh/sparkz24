import About from '@/widgets/About'
import React from 'react'
import styles from '@styles/scss/about.module.scss'

export default function page() {
    return (
        <div className={styles.wrap}>
            <About />
        </div>
    )
}
