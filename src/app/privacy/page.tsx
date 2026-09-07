import NavigationHeader from "@/components/NavigationHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 flex flex-col">
      <NavigationHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: September 2026</p>

        <div className="space-y-6 text-sm text-gray-300 bg-[#121218] border border-white/5 p-8 rounded-2xl">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>Codev collects minimal user information necessary to provide authentication and snippet storage, including account email address and basic profile information provided via Clerk Authentication.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. Code Execution Data</h2>
            <p>Code submitted for execution is processed transiently in sandbox environments. We do not sell or share your source code with third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Storage & Security</h2>
            <p>Shared snippets and execution metrics are stored securely in Convex cloud data storage with encrypted data transfer protocols.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Contact Us</h2>
            <p>For questions regarding this privacy policy, please contact <a href="https://mail.google.com/mail/?view=cm&fs=1&to=deveshkesharwani2003@gmail.com&su=Codev%20Privacy%20Inquiry" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">deveshkesharwani2003@gmail.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
