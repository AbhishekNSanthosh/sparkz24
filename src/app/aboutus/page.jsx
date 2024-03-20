import About from '@/widgets/About'
import React from 'react'
import styles from '@styles/scss/about.module.scss'
import Footer from '@/widgets/Footer'
import Credits from '@/widgets/Credits'

export default function page() {
    return (
        <>
            <div className={styles.wrap}>
                <About />
            </div>
            <Footer />
            <Credits />
        </>
    )
}
