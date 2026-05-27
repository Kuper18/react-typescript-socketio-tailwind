import { USER_API_ROUTES } from '@/constants/api-routes';
import axiosInstance from '@/lib/axios-instance';
import type { User } from '@/types/user';

export class Api {
  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axiosInstance.get<User>(
        USER_API_ROUTES.getCurrentUser
      );

      return response.data;
    } catch {
      return null;
    }
  }
}
