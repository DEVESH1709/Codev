import { NextResponse } from "next/server";

const WANDBOX_COMPILERS: Record<string, string> = {
  javascript: "nodejs-20.17.0",
  typescript: "typescript-5.6.2",
  python: "cpython-3.12.7",
  rust: "rust-1.82.0",
  go: "go-1.23.2",
  cpp: "gcc-head",
  java: "openjdk-jdk-22+36",
  csharp: "dotnetcore-8.0",
  ruby: "ruby-3.3.5",
  swift: "swift-6.0",
};

async function executeViaWandbox(language: string, code: string, stdin?: string) {
  const compiler = WANDBOX_COMPILERS[language.toLowerCase()];
  if (!compiler) {
    throw new Error(`Cloud execution not available for ${language}`);
  }

  const res = await fetch("https://wandbox.org/api/compile.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      compiler,
      code,
      stdin: stdin || "",
    }),
  });

  const data = await res.json();
  const statusCode = parseInt(data.status || "0", 10);
  const hasCompileError = Boolean(data.compiler_error || data.compiler_message);

  return {
    run: {
      code: statusCode,
      output: (data.program_output || data.program_message || "").trim(),
      stderr: data.program_error || "",
      stdout: data.program_output || "",
    },
    compile: hasCompileError && statusCode !== 0
      ? {
          code: statusCode,
          output: data.compiler_error || data.compiler_message || "",
          stderr: data.compiler_error || "",
        }
      : undefined,
    language,
    version: "latest",
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = body.files?.[0]?.content || "";
    const language = body.language || "javascript";
    const stdin = body.stdin || "";

    const pistonApiUrl =
      process.env.PISTON_URL ||
      process.env.NEXT_PUBLIC_PISTON_URL ||
      "http://localhost:2000/api/v2/execute";

    // 1. Try primary Piston endpoint (Local Docker or private cloud)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(pistonApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // If not blocked by whitelist, return Piston result
        if (!data.message || !data.message.includes("whitelist")) {
          return NextResponse.json(data);
        }
      }
    } catch {
      // Piston connection failed (expected on Vercel without a self-hosted Piston URL)
    }

    // 2. Cloud Fallback: Use free public Wandbox compiler
    try {
      const cloudResult = await executeViaWandbox(language, code, stdin);
      return NextResponse.json(cloudResult);
    } catch (wandboxErr: any) {
      console.error("Cloud compiler error:", wandboxErr);
      return NextResponse.json(
        {
          message:
            "Execution engine unavailable. Ensure your local Docker Piston is running or try again later.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Execute API Route Error:", error);
    return NextResponse.json(
      { message: "Invalid request payload" },
      { status: 400 }
    );
  }
}
