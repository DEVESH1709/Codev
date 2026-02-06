import Header from "./_components/Header";
import EditorOutputSplit from "./_components/EditorOutputSplit";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-[#0a0a0f] to-[#12121a]">
      <div className="max-w-[1800px] w-full mx-auto p-4 flex flex-col flex-1 min-h-0">
        <Header />
        <EditorOutputSplit />
      </div>
    </div>
  );
}
