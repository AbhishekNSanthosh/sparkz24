"use client"

import { backend } from '@/common/constants/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { revalidatePath } from 'next/cache'

// export const userLogin = async (
//     email,
//     password,
//     // toast
// ) => {
//     try {
//         const response = await axios.post(backend + '/login', {
//             email, password
//         })
//         revalidatePath('/')
//         toast.success(response?.data?.message, {
//             position: "bottom-center",
//             theme:"colored"
//         });
//         localStorage.setItem('accessToken', response?.data?.accessToken);
//         return true
//     } catch (error) {
//         toast.error(error?.response?.data?.message, {
//             position: "bottom-center",
//             theme:"colored"
//         });
//         return false
//     }
// }

export const userLogin = async (
    email,
    password,
    // toast
) => {
    try {
        const res = await fetch(backend + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        },
            { next: { revalidate: 3600 } }
        );

        const data = await res.json();
        if (!res.ok) {
            throw { message: data?.message };
        }
        toast.success(data?.message, {
            position: "bottom-center",
            theme: "colored"
        });

        if (typeof window !== 'undefined') {
            // Perform localStorage action
            localStorage.setItem('accessToken', data?.accessToken)
        }

        const user = await fetch(backend + '/getUserDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+data?.accessToken
            },
        },
            { next: { revalidate: 3600 } }
        );
        console.log(user)
        // Optionally, you can return the data here if you want to use it outside this function
        return true;
    } catch (error) {
        toast.error(error?.message, {
            position: "bottom-center",
            theme: "colored"
        });
        console.log(error)
    }
}
