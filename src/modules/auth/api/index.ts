import axios from 'axios';

import { AUTH_API_ROUTES } from '@/constants/api-routes';
import axiosInstance, { API_CONFIG } from '@/lib/axios-instance';

import type { LoginFormValues, SignupFormValues } from '../schemas';
import type { AuthApiResponse, ResetPasswordPayload } from '../types';

export class AuthApi {
  static async login(data: LoginFormValues): Promise<AuthApiResponse> {
    const response = await axios.post<AuthApiResponse>(
      AUTH_API_ROUTES.login,
      data,
      API_CONFIG
    );

    return response.data;
  }

  static async signup(
    data: Omit<SignupFormValues, 'confirmPassword'>
  ): Promise<AuthApiResponse> {
    const response = await axios.post<AuthApiResponse>(
      AUTH_API_ROUTES.signup,
      data,
      API_CONFIG
    );

    return response.data;
  }

  static async refreshToken(): Promise<AuthApiResponse> {
    const response = await axios.post<AuthApiResponse>(
      AUTH_API_ROUTES.refreshToken,
      {},
      API_CONFIG
    );

    return response.data;
  }

  static async logout(): Promise<void> {
    const response = await axiosInstance.post(AUTH_API_ROUTES.logout);

    return response.data;
  }

  static async verifyEmail(token: string): Promise<AuthApiResponse> {
    const response = await axios.get<AuthApiResponse>(
      `${AUTH_API_ROUTES.verifyEmail}?token=${token}`,
      API_CONFIG
    );

    return response.data;
  }

  static async resendEmailVerification(
    email: string
  ): Promise<AuthApiResponse> {
    const response = await axios.post<AuthApiResponse>(
      AUTH_API_ROUTES.resendEmailVerification,
      { email },
      API_CONFIG
    );

    return response.data;
  }

  static async forgotPassword(email: string): Promise<AuthApiResponse> {
    const response = await axios.post<AuthApiResponse>(
      AUTH_API_ROUTES.forgotPassword,
      { email },
      API_CONFIG
    );

    return response.data;
  }

  static async resetPassword(
    payload: ResetPasswordPayload
  ): Promise<AuthApiResponse> {
    const response = await axios.post<AuthApiResponse>(
      AUTH_API_ROUTES.resetPassword,
      payload,
      API_CONFIG
    );

    return response.data;
  }

  static googleAuth(): void {
    window.location.href = `${API_CONFIG.baseURL}${AUTH_API_ROUTES.googleAuth}`;
  }
}
