import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Codev",
  description: "Share and run code snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#0d0d14",
          colorInputBackground: "#13131f",
          colorInputText: "#e2e8f0",
          colorText: "#e2e8f0",
          colorTextSecondary: "#94a3b8",
          colorPrimary: "#3b82f6",
          colorDanger: "#f87171",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-geist-sans), sans-serif",
          // removed colorNeutral — it was darkening dropdown menu text/icons
        },
        elements: {
          /* ── Card / Modal ── */
          card: "bg-[#0d0d14] border border-white/10 shadow-2xl shadow-black/60 rounded-2xl",
          cardBox: "shadow-none",

          /* ── Header ── */
          headerTitle: "text-white text-xl font-bold tracking-tight",
          headerSubtitle: "text-slate-400 text-sm",

          /* ── Social OAuth buttons ── */
          socialButtonsBlockButton:
            "bg-[#13131f] border border-white/10 text-slate-200 hover:bg-white/10 hover:border-blue-500/50 transition-all rounded-xl text-sm font-medium",
          socialButtonsBlockButtonText: "text-slate-200 font-medium",
          socialButtonsProviderIcon: "w-4 h-4",

          /* ── Divider ── */
          dividerLine: "bg-white/10",
          dividerText: "text-slate-500 text-xs",

          /* ── Form labels & inputs ── */
          formFieldLabel: "text-slate-300 text-sm font-medium",
          formFieldInput:
            "bg-[#13131f] border border-white/10 text-slate-100 placeholder-slate-600 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm",
          formFieldInputShowPasswordButton: "text-slate-400 hover:text-white",

          /* ── Primary action button ── */
          formButtonPrimary:
            "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all text-sm",

          /* ── Footer links ── */
          footerActionText: "text-slate-400 text-sm",
          footerActionLink: "text-blue-400 hover:text-blue-300 font-medium transition-colors",
          footer: "bg-transparent border-t border-white/5",

          /* ── Internal navigation (back arrow, etc.) ── */
          identityPreviewText: "text-slate-300",
          identityPreviewEditButton: "text-blue-400 hover:text-blue-300",

          /* ── Alert / error ── */
          alert: "bg-red-500/10 border border-red-500/20 rounded-xl",
          alertText: "text-red-400 text-sm",

          /* ── Clerk branding badge ── */
          internal: "opacity-30 hover:opacity-60 transition-opacity",

          /* ── UserButton popover dropdown ── */
          userButtonPopoverCard:
            "bg-[#0d0d14] border border-white/10 shadow-2xl shadow-black/60 rounded-2xl",
          userButtonPopoverActions: "bg-transparent",
          userButtonPopoverActionButton:
            "text-slate-200 hover:bg-white/10 hover:text-white rounded-xl transition-all",
          userButtonPopoverActionButtonText: "text-slate-200",
          userButtonPopoverActionButtonIcon: "text-slate-400",
          userButtonPopoverFooter: "border-t border-white/5 bg-transparent",
          userButtonPopoverMainIdentifier: "text-white font-semibold",
          userButtonPopoverSecondaryIdentifier: "text-slate-400 text-xs",
          userPreviewMainIdentifier: "text-white font-semibold",
          userPreviewSecondaryIdentifier: "text-slate-400 text-xs",

          /* ── Custom UserButton.Link / UserButton.Action items (e.g. "Profile") ── */
          userButtonPopoverCustomItemButton:
            "text-slate-200 hover:bg-white/10 hover:text-white rounded-xl transition-all",
          userButtonPopoverCustomItemButtonText: "text-slate-200",
          userButtonPopoverCustomItemButtonIcon: "text-slate-400",
          menuItem:
            "text-slate-200 hover:bg-white/10 hover:text-white rounded-xl transition-all",
          menuItemText: "text-slate-200",
          menuItemIcon: "text-slate-400",
          menuButton:
            "text-slate-200 hover:bg-white/10 hover:text-white rounded-xl transition-all",
          menuButtonText: "text-slate-200",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>

          <Footer />

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

