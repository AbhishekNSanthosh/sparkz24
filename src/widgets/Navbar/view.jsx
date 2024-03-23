/**
 * © SPARKZ CCET 2024. All rights reserved.
 *
 * This code is the property of SPARKZCCET 24 and is protected by copyright law.
 * Unauthorized use, reproduction, or distribution is strictly prohibited.
 *
 * @author Abhishek Santhosh
 */
'use client';

import React, { useState, useEffect } from 'react';
import styles from '@styles/scss/navbar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '../../common/constants/constants'
import { MdLogin } from "react-icons/md"
import { MdAccountCircle } from "react-icons/md";
import { revalidatePath } from 'next/cache'

export default function Navbar() {

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [token, setToken] = useState(false);
  // localStorage.setItem('chakra-ui-color-mode', 'dark')
  const handleScroll = () => {
    setScrollPosition(window.scrollY);

    if (scrollPosition > 40 && !isNavbarFixed) {
      setIsNavbarFixed(true);
    } else if (scrollPosition <= 40 && isNavbarFixed) {
      setIsNavbarFixed(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition, isNavbarFixed]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setToken(localStorage.getItem('accessToken'))
    }
  }, [])

  return (
    <div className={isNavbarFixed ? styles.styledcontainer : styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image src="/images/sparkzLogo.svg" width="1" height={10} className={styles.logo} />
          <span className={styles.logoTxt}>SPARKZ'<span className={styles.highlight}>24</span></span>
        </div>
        <div className={styles.center}>
          {navLinks?.map((item, index) => (
            <div className={styles.navItemBox} key={`navLink_index${item}_${index}`}>
              <Link href={item?.link} className={styles.navItem}>{item?.title}</Link>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          {token ?
            <Link href='/login' onClick={() => {
              revalidatePath('/login')
            }}>
              <MdAccountCircle className={styles.icon} />
            </Link>
            :
            <Link href='/login'>
              <MdLogin className={styles.icon} />
            </Link>
          }
        </div>
      </div>
    </div>
  )
}
