import { api } from "../client"
import { ENDPOINTS } from "../endpoints"

export const subscriptionService = {
  /**
   * Fetch active subscription plans from backend.
   */
  plans: (options) => api.get(ENDPOINTS.subscription.plans, options),

  /**
   * Fetch current user's subscription status.
   */
  status: (options) => api.get(ENDPOINTS.subscription.status, options),

  /**
   * Create Razorpay order to subscribe to a plan.
   * @param {number} planId
   */
  checkout: (planId, options) => api.post(ENDPOINTS.subscription.checkout, { plan_id: planId }, options),

  /**
   * Verify Razorpay payment signature and activate subscription.
   * @param {{ razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }} data
   */
  verify: (data, options) => api.post(ENDPOINTS.subscription.verify, data, options),
}
