import { NextRouter } from 'next/router';

export const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  query: {},
  push: jest.fn(),
} as unknown as NextRouter;
