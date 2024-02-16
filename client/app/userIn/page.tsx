'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../contexto/AuthContext";

function Page() {
    const { user }: any = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
        
    }, [user])

    return (<h1>Only logged in users can view this page</h1>);
}

export default Page;