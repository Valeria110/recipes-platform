import { IFav } from '@/shared/model/fav';
import { mutate } from 'swr';

interface IWorkerMessage {
  action: 'add' | 'remove';
  data?: IFav;
  favsData: IFav[];
  recipeId?: string;
}

self.onmessage = (e: MessageEvent<IWorkerMessage>) => {
  const { action, recipeId, data, favsData } = e.data;

  try {
    if (action === 'add' && data) {
      mutate('favs', [...favsData, data], false);
    } else if (action === 'remove' && recipeId && favsData) {
      const updatedFavsData = favsData.filter((fav) => fav.recipeId !== recipeId);
      mutate('favs', updatedFavsData);
    } else {
      throw new Error('Wrong message params');
    }
  } catch (err) {
    self.postMessage({ error: err });
  }
};
