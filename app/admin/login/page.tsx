import { Suspense } from "react"
import { Signature } from "@/components/signature"
import { LoginForm } from "@/components/admin/login-form"
import { isAdminConfigured } from "@/lib/admin/auth"

export default function LoginPage() {
  const configured = isAdminConfigured()
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-[400px]">
        <Signature className="mx-auto h-14 w-auto" />
        <div className="panel mt-6 border-t-2 border-t-blue p-7">
          <h1 className="text-[22px] font-bold text-ink">Portal sign in</h1>
          <p className="mt-1.5 text-[14px] text-ink-500">Manage the text, images and case studies on your site.</p>
          {configured ? (
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          ) : (
            <p className="mt-6 border border-hair bg-page p-4 text-[14px] leading-relaxed text-ink-700">
              The portal is not set up yet. Add <code className="font-mono text-[13px]">ADMIN_USERNAME</code>, <code className="font-mono text-[13px]">ADMIN_PASSWORD_HASH</code> and <code className="font-mono text-[13px]">ADMIN_SESSION_SECRET</code> to the environment, then reload. The README explains each one.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
