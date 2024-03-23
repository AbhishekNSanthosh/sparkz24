
"use client"
import React, { useEffect, useState } from 'react'
import styles from '@styles/scss/login.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { userLogin } from '@/services/Login'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const res = await userLogin(email, password);
            if (res) {
                setTimeout(() => {
                    window.location.replace('/')
                }, 1000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (token) {
    //         router.push('/');
    //     }
    // }, [])

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
                                    <input onChange={(e) => setEmail(e.target.value)} type="text" className={styles.inputField} placeholder='jacs@gmail.com' />
                                </div>
                                <div className={styles.inputBox}>
                                    <span className={styles.label}>Password</span>
                                    <input onChange={(e) => setPassword(e.target.value)} type="text" className={styles.inputField} placeholder='12345678' />
                                </div>
                            </div>
                            <div className={styles.loginRow}>
                                <button className={styles.submit} onClick={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }} >Login</button>
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
