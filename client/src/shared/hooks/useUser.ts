import { usersService } from '@/shared/api';
import { IUser } from '@/shared/model/user';
import useSWR from 'swr';

export function useUser(userId: string | null) {
  const { data, error, isLoading } = useSWR<IUser, Error>(
    userId ? userId : null,
    userId ? () => usersService.getUserById(userId) : null,
  );

  if (!userId) {
    return { data: { name: 'unknown author' }, error: null, isLoading: false };
  }

  return { data, error, isLoading };
}
