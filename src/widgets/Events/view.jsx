import React from 'react'
import styles from '@styles/scss/events.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { depLogo } from '@/common/constants/constants'

export default function Events() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.title}>
                        Events
                    </div>
                </div>
                <div className={styles.imgRow}>
                    {depLogo?.map((logo, index) => (
                        <Link href={logo?.url}>
                            <Image src={logo?.img} height={1000} width={1000} key={index} className={styles.img} alt='events'/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
