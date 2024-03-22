"use client"

import { backend } from '@/common/constants/constants';
import axios from 'axios';

export const userRegister = async (
    firstName,
    lastName,
    email,
    mobileNo,
    college,
    department,
    semester,
    password,
    toast
) => {
    try {
        const response = await axios.post(backend + '/register', {
            firstName,
            lastName,
            email,
            mobileNo,
            college,
            department,
            semester,
            password,
        })
        toast({
            title: response?.data?.message,
            description: "Redirecting to home page",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        return true
    } catch (error) {
        toast({
            title: error?.response?.data?.message,
            description: error?.response?.data?.description,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
        return false
    }
}