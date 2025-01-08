import { AppDispatch, AppStore, RootState } from '@/store/store';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
