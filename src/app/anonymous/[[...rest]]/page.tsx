import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import ContentAnonymous from './content'

const Anonymous = async ({ searchParams }: any) => {
    const dataCookie = cookies()
    if (!dataCookie.get('meetingId')?.value) {
        redirect('/')
    }
    // await fetch('https://api.clerk.com/v1/actor_tokens',
    //     {
    //         headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    //         method: 'POST',
    //         body: JSON.stringify({
    //             user_id: 'user_2ij98eEEMSJQ9PbwqGUhmpdnitg',
    //             actor: {
    //                 sub: "user_2iMgwLnLNoXpktm8KKMVQ7ukqkP"
    //             },
    //         })
    //     }
    // ).then(res => {
    //     console.log(res, 'res status')
    //    return res.json()
    // })
    
    return (
       <ContentAnonymous id={'instant'} />
    )
}

export default Anonymous