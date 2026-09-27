import { Suspense } from "react";
import Header from "./_components/Header";
import EditorOutputSplit from "./_components/EditorOutputSplit";
import HeroSection from "./_components/HeroSection";
import OnboardingGuard from "./_components/OnboardingGuard";
import PracticePanel from "./_components/PracticePanel";
import ProductTour from "./_components/ProductTour";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0a0a0f] to-[#12121a]">
      <div className="max-w-[1800px] w-full mx-auto px-2.5 sm:px-4 pb-4 flex flex-col flex-1">
        <OnboardingGuard />
        <Header />
        <HeroSection />
        <div id="editor" className="flex flex-col flex-1 mt-4 scroll-mt-20">
          <Suspense>
            <PracticePanel />
          </Suspense>
          <EditorOutputSplit />
        </div>
        <ProductTour />
      </div>
    </div>
  );
}
