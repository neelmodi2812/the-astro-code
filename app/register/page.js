import * as React from "react"
import RegisterClient from "./(register)"

/**
 * Register & Sign-Up Page (Server Component)
 */
export default function RegisterPage() {
  return (
    <React.Suspense fallback={null}>
      <RegisterClient />
    </React.Suspense>
  )
}
