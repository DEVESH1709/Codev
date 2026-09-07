import NavigationHeader from "@/components/NavigationHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 flex flex-col">
      <NavigationHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: September 2026</p>

        <div className="space-y-6 text-sm text-gray-300 bg-[#121218] border border-white/5 p-8 rounded-2xl">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Acceptable Use</h2>
            <p>Codev is provided for educational and software development purposes. Users agree not to execute malicious code, denial of service scripts, or exploit sandbox resources.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. User Content</h2>
            <p>You retain ownership of code snippets created on Codev. Publicly shared snippets are visible to community members.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Service Availability</h2>
            <p>Codev is provided "as is" without warranty. We reserve the right to enforce rate limits or modify sandbox quotas as needed for service stability.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
