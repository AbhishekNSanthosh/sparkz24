"use client"

import { backend } from '@/common/constants/constants';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export const userRegister = async (
    firstName,
    lastName,
    email,
    mobileNo,
    college,
    department,
    semester,
    password,
    // toast
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
        toast.success(error?.response?.data?.message, {
            position: "bottom-center"
        });
        return true
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            position: "bottom-center"
        });
        return false
    }
}