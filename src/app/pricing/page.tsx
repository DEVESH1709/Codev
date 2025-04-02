import { currentUser } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser';
import React from 'react'
import ProPlanView from './_components/ProPlanView';
import NavigationHeader from '@/components/NavigationHeader';

async function PricingPage() {
    const user= await currentUser();
    const convex =new ConvexHttpClient(process.env.NEXT_PUBLIC_COVEX_URL!);
    const convexUser =await convex.query(api.user.getUser,{
        userId:user?.id || ""
    })

    if(convexUser?.isPro) return <ProPlanView></ProPlanView>
  return (
    <div className='relative min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20 selection:text-blue-200'>
        <NavigationHeader></NavigationHeader>

        <main className='relative pt-32 pb-24 px-4'>
         <div className='max-w-7xl mx-auto'>

         <div className="text-center mb-24">
            <div className="relative inline-block">
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-10" />
              <h1
                className="relative text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r
               from-gray-100 to-gray-300 text-transparent bg-clip-text mb-8"
              >
                Elevate Your <br />
                Development Experience
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join the next generation of developers with our professional suite of tools
            </p>
          </div>

          {/*  Enetrprise Feature*/}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative bg-gradient-to-b from-[#12121a] to-[#0a0a0f] rounded-2xl p-6 hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                  flex items-center justify-center mb-4 ring-1 ring-gray-800/60 group-hover:ring-blue-500/20"
                  >
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2">{feature.label}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
         </div>
        </main>
    </div>
  )
}

export default PricingPage
