import NavigationHeader from "@/components/NavigationHeader";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 flex flex-col">
      <NavigationHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-white mb-4">Support & Help Center</h1>
        <p className="text-gray-400 mb-8">
          Need help with Codev? We are here to assist you with any questions or technical issues.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#121218] border border-white/5 p-6 rounded-2xl">
            <Mail className="w-8 h-8 text-blue-400 mb-3" />
            <h2 className="text-lg font-semibold text-white mb-2">Email Support</h2>
            <p className="text-sm text-gray-400 mb-4">Contact our engineering team directly for help.</p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=deveshkesharwani2003@gmail.com&su=Codev%20Support%20Request"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              deveshkesharwani2003@gmail.com &rarr;
            </a>
          </div>

          <div className="bg-[#121218] border border-white/5 p-6 rounded-2xl">
            <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
            <h2 className="text-lg font-semibold text-white mb-2">Community Feedback</h2>
            <p className="text-sm text-gray-400 mb-4">Found a bug or have a feature request?</p>
            <a
              href="https://github.com/DEVESH1709/Codev/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:underline"
            >
              Report on GitHub &rarr;
            </a>
          </div>
        </div>

        <div className="bg-[#121218] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-400">
            <div>
              <p className="font-medium text-gray-200">How does code execution work?</p>
              <p className="mt-1">Codev executes code inside isolated sandboxes via the Piston execution API with resource limits and timeouts.</p>
            </div>
            <div>
              <p className="font-medium text-gray-200">Is my code saved?</p>
              <p className="mt-1">Your code edits persist locally in your browser and can be saved as public community snippets when signed in.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
