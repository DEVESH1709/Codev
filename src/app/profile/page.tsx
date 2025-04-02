import { useUser } from "@clerk/nextjs";
import { useQueries } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";

import {motion} from "framer-motion"
function ProfilePage() {

    const {user,isLoaded} = useUser();
    const router =useRouter();
    const [activeTab,setActiveTab] =useState<"execution"| "started">("execution");
    
    const userStats = useQuery(api.snippets.getStarredSnippets);

    const[results:executions, status:executionStatus, loadMore,] = usePaginationQuery(api.codeExecutions.getUserExecutions,{
        userId:user?.id??""
    },{initialNumItems:5});


    const userData = useQuery(api.users.getUser,{userId:user?.id??""} );
    const handleLoadMore =()=>{
        if(executionStatus ==="CanLoadMore")loadMore(5);
    }
    if(!user && isLoaded) return router.push("/");
  return (


    <div className="min-h-screen bg-[#0a0a0f]">
        <NavigationHeader></NavigationHeader>
        <div className="max-w-7xl mx-auto px-4 py-12">
            {userStats && userData &&(
                <ProfileHaeder userStats ={userStats} userData ={userData} user={user}>

                </ProfileHaeder>
            )}

            {(userStats ===undefined|| !isLoaded) && <ProfileHeaderSkeleton></ProfileHeaderSkeleton>}

            {/* Main Content */}
            <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl shadow-2xl shadow-black/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden">
            <div className="border-b border-gray-800/50">
            <div className="flex space-x-1 p-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "executions" | "starred")}
                  className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
                    activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500/10 rounded-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <tab.icon className="w-4 h-4 relative z-10" />
                  <span className="text-sm font-medium relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

            </div>
        </div>
     
    </div>
  )
}

export default ProfilePage
