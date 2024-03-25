"use client"

import React, { useEffect } from 'react'
import styles from '@styles/scss/profile.module.scss'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export default function Profile() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.replace('/login');
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topBar}>
          <div className={styles.left}>
            <span className={styles.welcome}>Welcome Abhishek</span>
          </div>
          <div className={styles.right}>
            <button className={styles.logout} onClick={() => {
              localStorage.clear();
              toast.success('Logout successfull. Redirecting to login page.',{
                position:"bottom-center",
                theme:"colored"
              })
              setTimeout(() => {
                router.replace('/login');
              }, 500);
            }}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
