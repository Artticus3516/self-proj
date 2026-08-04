'use client'

import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, {})

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-lg border border-border text-card-foreground">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Admin Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the Archon portal</p>
        </div>

        <form action={action} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-lg border border-input bg-input/20 py-2.5 px-3 text-foreground placeholder:text-muted-foreground focus:z-10 focus:border-primary focus:ring-1 focus:ring-ring sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-lg border border-input bg-input/20 py-2.5 px-3 text-foreground placeholder:text-muted-foreground focus:z-10 focus:border-primary focus:ring-1 focus:ring-ring sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {state.error && (
            <div className="text-sm text-destructive font-medium">{state.error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-lg bg-primary py-2.5 px-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 transition-colors shadow-md"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
