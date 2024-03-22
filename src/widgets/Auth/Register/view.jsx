"use client"

import React, { useState } from 'react'
import styles from '@styles/scss/register.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { userRegister } from '@/services/Register'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async () => {
    const res = await userRegister(
      firstName,
      lastName,
      email,
      mobileNo,
      college,
      department,
      semester,
      password,
      toast
    );

    if (res) {
      setTimeout(() => {
        router.push('/login')
      }, 400);
    }
  }

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
                <input onChange={(e) => {
                  setFirstName(e.target.value);
                }} type="text" className={styles.txtBox} placeholder='Jacs' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Last Name</span>
                <input onChange={(e) => {
                  setLastName(e.target.value);
                }} type="text" className={styles.txtBox} placeholder='Jacob' />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.label}>Email</span>
                <input onChange={(e) => {
                  setEmail(e.target.value);
                }} type="email" className={styles.txtBox} placeholder='mark@gmail.com' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Mobile Number</span>
                <input onChange={(e) => {
                  setMobileNo(e.target.value);
                }} type="text" className={styles.txtBox} placeholder='7907247909' />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.label}>College</span>
                <input onChange={(e) => {
                  setCollege(e.target.value);
                }} type="text" className={styles.txtBox} placeholder='Carmel college of engineering & technology' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Department</span>
                <input onChange={(e) => {
                  setDepartment(e.target.value);
                }} type="text" className={styles.txtBox} placeholder='Computer Science & Engineering' />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.InputBox}>
                <span className={styles.label}>Semester</span>
                <input onChange={(e) => {
                  setSemester(e.target.value);
                }} type="text" className={styles.txtBox} placeholder='S4' />
              </div>
              <div className={styles.InputBox}>
                <span className={styles.label}>Password</span>
                <input onChange={(e) => {
                  setPassword(e.target.value);
                }} type="password" className={styles.txtBox} placeholder='12345678' />
              </div>
            </div>

            <div className={styles.row}>
              <button className={styles.submit} onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>Submit</button>
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
