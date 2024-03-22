"use client"

import { backend } from '@/common/constants/constants';
import axios from 'axios';

export const userLogin = async (
    email,
    password,
    toast
) => {
    try {
        const response = await axios.post(backend + '/login', {
            email, password
        })
        toast({
            title: response?.data?.message,
            description: "Redirecting to home page",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        localStorage.setItem('accessToken', response?.data?.accessToken);
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