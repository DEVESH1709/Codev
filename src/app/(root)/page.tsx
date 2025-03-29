import Image from "next/image";

export default function Home() {
  return (
  <div className="min-h-screen">

    <div className="max-w-[1800px] mx-auto p-4">
      <Header></Header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EditorPanel></EditorPanel>
        <OutputPanel></OutputPanel>
      </div>
    </div>
   
  </div>
  );
}
