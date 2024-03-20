import React from 'react'
import styles from '@styles/scss/login.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <Image src="/gifs/login.gif" width={1500} height={1500} className={styles.gif} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.loginBox}>
                            <div className={styles.loginRow}>
                                <span className={styles.title}>Login</span>
                            </div>
                            <div className={styles.loginCol}>
                                <div className={styles.inputBox}>
                                    <span className={styles.label}>Email</span>
                                    <input type="text" className={styles.inputField} placeholder='jacs@gmail.com' />
                                </div>
                                <div className={styles.inputBox}>
                                    <span className={styles.label}>Password</span>
                                    <input type="text" className={styles.inputField} placeholder='12345678' />
                                </div>
                            </div>
                            <div className={styles.loginRow}>
                                <button className={styles.submit}>Login</button>
                            </div>
                            <div className={styles.helpRow}>
                               <span className={styles.help}>Already have an account? <Link href="/register" className={styles.high}>Sign Up</Link></span>
                               <span className={styles.help}>Forgot password</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
