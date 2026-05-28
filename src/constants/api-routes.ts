export const AUTH_API_ROUTES = {
  login: '/auth/login',
  signup: '/auth/signup',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh-token',
  verifyEmail: '/auth/verify-email',
  resendEmailVerification: '/auth/resend-email-verification',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  googleAuth: '/auth/google',
} as const;

export const USER_API_ROUTES = {
  getCurrentUser: '/users/me',
} as const;
