import React from 'react';
import { AppContext } from '../contexts/AppContext';

export function useApp() {
  return React.useContext(AppContext);
}
