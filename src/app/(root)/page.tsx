import Header from "./_components/Header";
import EditorOutputSplit from "./_components/EditorOutputSplit";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0a0a0f] to-[#12121a]">
      <div className="max-w-[1800px] w-full mx-auto px-4 pb-4 flex flex-col flex-1">
        <Header />
        <HeroSection />
        <div id="editor" className="flex flex-col flex-1 mt-4 scroll-mt-20">
          <EditorOutputSplit />
        </div>
      </div>
    </div>
  );
}
