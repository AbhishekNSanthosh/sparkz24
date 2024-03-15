/**
 * © SPARKZ CCET 2024. All rights reserved.
 *
 * This code is the property of SPARKZCCET 24 and is protected by copyright law.
 * Unauthorized use, reproduction, or distribution is strictly prohibited.
 *
 * @author Abhishek Santhosh
 */

import React from 'react'
import styles from '@styles/scss/navbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '../../common/constants/constants'

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image src="/images/sparkzLogo.svg" width="1" height={10} className={styles.logo} />
          <span className={styles.logoTxt}>SPARKZ'<span className={styles.highlight}>24</span></span>
        </div>
        <div className={styles.center}>
          {navLinks?.map((item, index) => (
            <div className={styles.navItemBox} key={`navLink_index${item}_${index}`}>
              <Link href="/" className={styles.navItem}>{item?.title}</Link>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          <button className={styles.registerBtn}>Register</button>
        </div>
      </div>
    </div>
  )
}
