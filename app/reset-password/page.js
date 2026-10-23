import * as React from "react"
import ResetPasswordClient from "./(reset-password)"

/**
 * Reset Password Page — target of the emailed link
 * `/reset-password?token=...&email=...` (see FRONTEND_URL in the Laravel .env).
 */
export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={null}>
      <ResetPasswordClient />
    </React.Suspense>
  )
}
