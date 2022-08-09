import { createGIPFactory, createGSPFactory } from 'nextjs-effector';
import { createEvent, sample } from 'effector';
import { getMenu } from '@/models/menu';

export const appStarted = createEvent();

export const createGIP = createGIPFactory({
  sharedEvents: [appStarted],
});

export const createGSP = createGSPFactory();

sample({
  clock: appStarted,
  target: [getMenu],
});
