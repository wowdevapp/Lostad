import { createLogger } from 'redux-logger';
import { Middleware } from '@reduxjs/toolkit';

const middlewareList: Middleware[] = [];

// Add logger middleware in development
if (process.env.NODE_ENV === 'development') {
  middlewareList.push(
    createLogger({
      collapsed: true
    })
  );
}

export const middleware = middlewareList;
