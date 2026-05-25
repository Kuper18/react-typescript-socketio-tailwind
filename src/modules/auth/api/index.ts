import { AUTH_API_ROUTES } from '@/constants/api-routes';
import axiosInstance from '@/lib/axios-instance';

import type { LoginFormValues, SignupFormValues } from '../schemas';
import type { AuthApiResponse, ResetPasswordPayload } from '../types';

export class AuthApi {
  static async login(data: LoginFormValues): Promise<AuthApiResponse> {
    const response = await axiosInstance.post<AuthApiResponse>(
      AUTH_API_ROUTES.login,
      data
    );

    return response.data;
  }

  static async signup(
    data: Omit<SignupFormValues, 'confirmPassword'>
  ): Promise<AuthApiResponse> {
    const response = await axiosInstance.post<AuthApiResponse>(
      AUTH_API_ROUTES.signup,
      data
    );

    return response.data;
  }

  static async refreshToken(): Promise<AuthApiResponse> {
    const response = await axiosInstance.post<AuthApiResponse>(
      AUTH_API_ROUTES.refreshToken
    );

    return response.data;
  }

  static async logout(): Promise<void> {
    const response = await axiosInstance.post(AUTH_API_ROUTES.logout);

    return response.data;
  }

  static async verifyEmail(token: string): Promise<AuthApiResponse> {
    const response = await axiosInstance.get<AuthApiResponse>(
      `${AUTH_API_ROUTES.verifyEmail}?token=${token}`
    );

    return response.data;
  }

  static async resendEmailVerification(
    email: string
  ): Promise<AuthApiResponse> {
    const response = await axiosInstance.post<AuthApiResponse>(
      AUTH_API_ROUTES.resendEmailVerification,
      { email }
    );

    return response.data;
  }

  static async forgotPassword(email: string): Promise<AuthApiResponse> {
    const response = await axiosInstance.post<AuthApiResponse>(
      AUTH_API_ROUTES.forgotPassword,
      { email }
    );

    return response.data;
  }

  static async resetPassword(
    payload: ResetPasswordPayload
  ): Promise<AuthApiResponse> {
    const response = await axiosInstance.post<AuthApiResponse>(
      AUTH_API_ROUTES.resetPassword,
      payload
    );

    return response.data;
  }

  static async googleAuth() {
    const response = await axiosInstance.get(AUTH_API_ROUTES.googleAuth);

    return response.data;
  }
}
