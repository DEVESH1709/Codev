import { Zap } from "lucide-react";
import Link from "next/link"

export default function UpgradeButton(){
    const CHECKOUT_URL = "https://codev-store.lemonsqueezy.com/buy/3d2749b1-db03-4de2-b449-b1a304e40715"
    return(
        <Link
           href={ CHECKOUT_URL}
           className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hiver:from-blue-600 hover:to-blue-700 transition-all"
        >
            <Zap className="w-5 h-5"></Zap>
            Upgrade to Pro 
        </Link>
    )
}