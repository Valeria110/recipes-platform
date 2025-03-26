import { usersService } from '@/shared/api';
import { IUser } from '@/shared/model/user';
import useSWR from 'swr';

export function useUser(userId: string | null) {
  const { data, error, isLoading } = useSWR<IUser, Error>(
    userId ? userId : null,
    userId ? () => usersService.getUserById(userId) : null,
  );

  if (isLoading) {
    return { data: null, error: null, isLoading: true };
  }

  if (!userId) {
    return { data: null, error: 'userId is not defined', isLoading: false };
  }
  if (!data) {
    return { data: null, error: 'user is undefined', isLoading: false };
  }

  return { data, error, isLoading };
}
