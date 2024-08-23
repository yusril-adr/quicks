'use client';

import { useAppDispatch } from '@hooks/redux';
import { loginUserById } from '@states/authUser';
import { FC, ReactNode, useEffect } from 'react';

const GlobalLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loginUserById('u125'));
  }, [dispatch]);

  return <>{children}</>;
};

export default GlobalLayout;
