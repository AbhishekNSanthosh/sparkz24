import React from 'react'
import styles from '@styles/scss/register.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.title}>Welcome !</span>
              </div>
            </div>
            <div className={styles.row}>


              <div className={styles.InputBox}>
                <span className={styles.label}>First Name</span>
                <input type="text" className={styles.txtBox} placeholder='Jacs' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Last Name</span>
                <input type="text" className={styles.txtBox} placeholder='Jacob' />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.label}>Email</span>
                <input type="email" className={styles.txtBox} placeholder='mark@gmail.com' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Mobile Number</span>
                <input type="text" className={styles.txtBox} placeholder='7907247909' />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.label}>College</span>
                <input type="text" className={styles.txtBox} placeholder='Carmel college of engineering & technology' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Department</span>
                <input type="text" className={styles.txtBox} placeholder='Computer Science & Engineering' />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.label}>Semester</span>
                <input type="text" className={styles.txtBox} placeholder='S4' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Password</span>
                <input type="password" className={styles.txtBox} placeholder='12345678' />
              </div>
            </div>

            <div className={styles.row}>
             <button className={styles.submit}>Submit</button>
            </div>
            <div className={styles.help}>
             <span className={styles.helpText}>Already have an account ? <span className={styles.high}><Link href="/login">Login</Link></span></span>
             <span className={styles.helpText}>Forgot password?</span>
            </div>

          </div>


          <div className={styles.right}>
            <Image src="/gifs/party.gif" height={1000} width={1000} className={styles.gif} />
          </div>
        </div>
      </div>
    </div>
  )
}
