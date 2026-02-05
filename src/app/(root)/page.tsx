import Header from "./_components/Header";
import EditorOutputSplit from "./_components/EditorOutputSplit";

export default function Home() {
  return (
  <div className="min-h-screen">

    <div className="max-w-[1800px] mx-auto p-4">
      <Header />
      <EditorOutputSplit />
    </div>
   
  </div>
  );
}
