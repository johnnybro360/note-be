'use client'

import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {ChangeEvent, useState} from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";


export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSignUp = async () => {
        console.log(email, password);
    }


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
                        <Button onClick={handleSignUp}>Log In</Button>
                    </div>
                    <Link href={"/"}>
                        <FontAwesomeIcon className={'ml-3 h-8'} icon={faArrowLeft} />
                    </Link>
                </div>
            </div>
        </>
    )
}