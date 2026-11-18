import * as React from "react"
import LoginClient from "./(login)"

/**
 * Login & Authentication Page (Server Component)
 */
export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginClient />
    </React.Suspense>
  )
}
