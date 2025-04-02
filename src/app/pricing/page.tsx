import { currentUser } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser';
import React from 'react'

async function PricingPage() {
    const user= await currentUser();
    const convex =new ConvexHttpClient(process.env.NEXT_PUBLIC_COVEX_URL!);
    const convexUser =await convex.query(api.user.getUser,{
        userId:user?.id || ""
    })

    if(convexUser?.isPro) return <ProPlanView></ProPlanView>
  return (
    <div>
      
    </div>
  )
}

export default PricingPage
