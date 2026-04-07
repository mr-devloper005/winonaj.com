"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,rgba(59,130,246,0.1),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(15,23,42,0.03),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-lg">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10"
            >
              {!isSubmitted ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Reset access</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-blue-950 sm:text-4xl">
                    Reset your password
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Enter your email and we&apos;ll send you a link to choose a new password.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11 pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="h-12 w-full rounded-full text-base shadow-[0_10px_28px_rgba(37,99,235,0.25)]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending…" : "Send reset link"}
                    </Button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/90">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight text-blue-950 sm:text-3xl">Check your email</h1>
                  <p className="mt-4 text-slate-600">
                    We&apos;ve sent a reset link to <strong className="text-blue-950">{email}</strong>
                  </p>
                  <Button asChild variant="outline" className="mt-8 h-12 w-full rounded-full border-slate-200">
                    <Link href="/login">Back to sign in</Link>
                  </Button>
                  <p className="mt-6 text-sm text-slate-600">
                    Didn&apos;t receive the email?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Try again
                    </button>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
