'use client'

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function Home() {
    const route = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>)  => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/signin", {email, password});

            if (response.status === 201) {
                setIsLoggedIn(true);
                // console.log(response.data.token)
                localStorage.setItem('token', response.data.token);
                route.push('/posts')
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
        }
    }

    // useEffect(() => {
    //     // Check for existing JWT in local storage (if using)
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         // Verify JWT on backend (not shown here)
    //         // If verification successful, set isLoggedIn to true
    //         const verifyToken = async () => {
    //             try {
    //                 const response = await axios.post(
    //                     'http://localhost:3000/auth/verify-token',
    //                     { token } // Send the JWT token to the backend
    //                 );
    //                 console.log(response)
    //                 console.log(response.data)
    //                 if (response.status === 200) {
    //                     // Verification successful
    //                     setIsLoggedIn(true);
    //                     console.log('JWT verified:', response.data)
    //                 } else {
    //                     console.error('JWT verification failed:', response.data);
    //                     // Handle invalid or expired JWT (e.g., clear token from storage)
    //                     localStorage.removeItem('token');
    //                     console.log('JWT removed from local storage')
    //                 }
    //             } catch (error) {
    //                 console.error('Error verifying JWT:', error);
    //                 // Handle errors (e.g., network issues)
    //             }
    //         };
    //
    //         verifyToken(); //
    //     }
    // }, []); // Empty dependency array to run only once on component mount


    return (
        <>
            <div className={"flex flex-col justify-center items-center"}>
                <div>
                    <Input onChange={(event) => handleEmailChange(event)} placeholder="Enter your email"/>
                </div>
                <div>
                    <Input onChange={(event) => handlePasswordChange(event)} type={"password"}
                           placeholder="Enter your password"/>
                </div>
                <div className={"flex justify-between"}>
                    <div>
                        <Button onClick={(event) =>handleLogin(event)}>Log In</Button>
                    </div>
                    <Link href={"/signup"}>Sign Up</Link>
                </div>
            </div>
        </>
    )
}
