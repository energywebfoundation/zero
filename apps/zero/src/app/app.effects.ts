import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

export const useAppEffects = () => {
  const dispatch = useDispatch();
  return bindActionCreators({}, dispatch);
};
