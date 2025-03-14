import { TokenService, usersService } from '@/shared/api';

export const getUserData = async () => {
  const userId = TokenService.getUserId();
  if (userId) {
    const userData = await usersService.getUserById(userId);
    return userData;
  }

  return null;
};
